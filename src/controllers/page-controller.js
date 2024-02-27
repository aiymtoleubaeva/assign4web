const UserModel = require('../models/user-model');
const DeletedUserModel = require('../models/deletedUser-model');
const adminService = require('../services/admin-service')
class PageController {
    loginPage(req, res, next) {
        try {
            res.render('auth/login', {errorMessage: req.query.error});
        }catch (error){
            next(error);
        }
    }

    mainPage (req, res, next){
        try {
            res.render('main', {errorMessage: req.query.error})
        } catch (e) {
            next(error);
        }
    }

    registerPage(req, res, next) {
        try {
            res.render('auth/register', {errorMessage: req.query.error});
        } catch (error) {
            next(error);
        }

    }

    async editUserPage(req, res, next) {
        try {
            const userId = req.params.id;
            const user = await adminService.getUserDetails(userId);
            if (!user) {
                res.status(404).send('User not found');
            } else {
                res.render('admin/edit-user', { user });
            }
        } catch (error) {
            next(error);
        }
    }

    async addUserPage(req, res, next) {
        try{
            res.render('admin/add-user', {errorMessage: req.query.error});
        } catch(error) {
            next(error);
        }
    }

    superheroSearchPage(req, res, next) {
        try {
            res.render('superhero/search-superhero', {errorMessage: req.query.error});
        } catch (error) {
            next(error);
        }
    }

    async getAddFilmPage(req, res) {
        res.render('admin/add-upcoming-films');
    }

}

module.exports = new PageController();
