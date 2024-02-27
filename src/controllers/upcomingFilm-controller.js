const UpcomingFilmService = require('../services/upcomingFilm-service');

class UpcomingFilmController {
    async showAdminFilms(req, res) {
        const films = await UpcomingFilmService.getAllFilms();
        res.render('admin/admin-upcoming-films', { films });
    }

    async addFilm(req, res) {
        try {
            await UpcomingFilmService.addFilm(req.body);
            res.redirect('/upcoming-films/admin');
        } catch (error) {
            res.status(500).send(error.message);
        }
    }


    async showEditFilmForm(req, res) {
        const film = await UpcomingFilmService.getFilmById(req.params.id);
        console.log(film)
        res.render('admin/edit-upcoming-films', { film });
    }

    async editFilm(req, res) {
        await UpcomingFilmService.updateFilm(req.params.id, req.body);
        res.redirect('/upcoming-films/admin');
    }

    async deleteFilm(req, res) {
        await UpcomingFilmService.deleteFilm(req.params.id);
        res.redirect('/upcoming-films/admin');
    }

    async showPublicFilms(req, res) {
        const films = await UpcomingFilmService.getAllFilms();
        res.render('upcoming-films', { films });
    }
}

module.exports = new UpcomingFilmController();
