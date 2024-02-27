const jwt = require('jsonwebtoken')
const UserModel = require('../models/user-model');

const userAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        console.log(token)

        if (!token) {
            res.render('auth/login')
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findOne({ _id: decoded.user._id });

        if (!user) {
            res.render('auth/login')
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Authentication error:', error.message);
        res.render('auth/login')
    }
};

module.exports = userAuth;
