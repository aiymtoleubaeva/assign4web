const express = require('express')
const pageController = require('../controllers/page-controller');
const superheroController = require('../controllers/superhero-controller')
const userAuth = require('../middlewares/user-auth');

router = express.Router();

router.get('/', userAuth, superheroController.superheroSearchPage)

router.post('/', superheroController.superheroSearchPage)
router.get('/:superheroId/actors', userAuth, superheroController.getSuperheroActors);

module.exports = router;