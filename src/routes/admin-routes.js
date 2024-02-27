const express = require('express')
const adminController = require('../controllers/admin-controller')
const pageController = require('../controllers/page-controller')
const adminAuth = require('../middlewares/admin-auth')

router = express.Router();

router.use(adminAuth);

router.get('/users/add', pageController.addUserPage)
router.get('/users/:id/edit', pageController.editUserPage)

router.get('/', adminController.getAllUsers);
router.post('/users/add', adminController.addUser);
router.get('/users/:id', adminController.getUserDetails);
router.put('/users/:id/edit', adminController.editUser)
router.delete('/users/:id', adminController.deleteUser);

module.exports = router;