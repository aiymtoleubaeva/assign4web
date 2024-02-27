const express = require('express')
const adminRoutes = require('./admin-routes')
const authRoutes = require('./auth-routes')
const superheroRoutes = require('./superhero-routes')
const upcomingFilmRoutes = require('./upcomingFilm-routes')
const i18next = require('i18next');

const router = express.Router()

router.use('/', authRoutes)
router.use('/admin', adminRoutes)
router.use('/superhero', superheroRoutes)
router.use('/upcoming-films', upcomingFilmRoutes);
router.get('/change-lang/:lang', (req, res) => {
    const selectedLang = req.params.lang;
    req.session.lang = selectedLang;

    req.session.save((err) => {
        if (err) {
            console.error('Error saving session:', err);
            return res.status(500).send('Error saving session');
        }

        // Redirect to the referring page or home if no referrer is set
        const referrer = req.get('Referrer') || '/';
        res.redirect(referrer);
    });
});



module.exports = router;