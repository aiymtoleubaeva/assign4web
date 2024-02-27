const jwt = require('jsonwebtoken')
const UserModel = require('../models/user-model');

const adminAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: 'No authorization token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findOne({ _id: decoded.user._id });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Authentication error:', error.message);
        res.status(401).json({ message: 'Authentication failed', error: error.message });
    }
};

module.exports = adminAuth;
