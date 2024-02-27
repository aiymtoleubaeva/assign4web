require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./src/routes');
const methodOverride = require('method-override');
const i18next = require('i18next');
const middleware = require('i18next-http-middleware');
const Backend = require('i18next-node-fs-backend');
const session = require('express-session');

const app = express()

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
i18next
    .use(Backend)
    .use(middleware.LanguageDetector)
    .init({
        fallbackLng: 'en',
        backend: {
            loadPath: __dirname + '/src/locales/{{lng}}.json',
        },
        detection: {
            lookupSession: 'lang',
        },
    })
    .then(() => {
        console.log('i18next initialized successfully');
    })
    .catch((error) => {
        console.error('Error initializing i18next:', error);
    });
app.use(middleware.handle(i18next));
app.use((req, res, next) => {
    const currentLang = req.session.lang || 'en';
    req.i18n.changeLanguage(currentLang, (err) => {
        if (err) {
            console.error('Error changing language:', err);
            return next(err);
        }

        res.locals.currentLang = currentLang;
        next();
    });
});

app.get('/change-lang/:lang', (req, res) => {
    const selectedLang = req.params.lang;
    req.session.lang = selectedLang; // Save the chosen language to the session
    req.i18n.changeLanguage(selectedLang, (err) => {
        if (err) {
            console.error('Error changing language:', err);
            return res.status(500).send('Error changing language');
        }

        req.session.save(() => {
            res.redirect('back');
        });
    });
});

app.use(function (req, res, next) {
    console.log(req.cookies.token)
    res.locals.login = !!req.cookies.token;
    next();
});

app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views');

const port = process.env.PORT

app.use('/', router)


const run = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected DB...")
    }
    catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`)
    })
}

run()