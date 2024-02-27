const express = require('express');
const router = express.Router();
const UpcomingFilmController = require('../controllers/upcomingFilm-controller');
const pageController = require('../controllers/page-controller')
const adminAuth = require('../middlewares/admin-auth');
const methodOverride = require('method-override');
const userAuth = require('../middlewares/user-auth');

router.use(methodOverride('_method'));

router.get('/admin', adminAuth, UpcomingFilmController.showAdminFilms);
router.get('/add', adminAuth, pageController.getAddFilmPage);
router.post('/', adminAuth, UpcomingFilmController.addFilm);
router.get('/:id/edit', adminAuth, UpcomingFilmController.showEditFilmForm);
router.put('/:id', adminAuth, UpcomingFilmController.editFilm);
router.delete('/:id', adminAuth, UpcomingFilmController.deleteFilm);
router.get('/', userAuth, UpcomingFilmController.showPublicFilms);

module.exports = router;
