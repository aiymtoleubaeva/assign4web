const express = require('express')
const pageController = require('../controllers/page-controller');
const authController = require('../controllers/auth-controller')

router = express.Router();

router.get('/register', pageController.registerPage)
router.get('/login', pageController.loginPage)
router.get('/', pageController.mainPage)

router.post('/register', authController.registerUser)
router.post('/login', authController.loginUser)
router.post('/logout', authController.logoutUser)

module.exports = router;