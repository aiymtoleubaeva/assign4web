const UpcomingFilm = require('../models/upcomingFilm-model');

class UpcomingFilmService {
    async addFilm(filmData) {
        const newFilm = new UpcomingFilm(filmData);
        await newFilm.save();
    }

    async getAllFilms() {
        return UpcomingFilm.find({ deletedAt: { $exists: false } });
    }

    async getFilmById(id) {
        return UpcomingFilm.findById(id);
    }

    async updateFilm(id, filmData) {
        filmData.updatedAt = new Date();
        await UpcomingFilm.findByIdAndUpdate(id, filmData);
    }

    async deleteFilm(id) {
        await UpcomingFilm.findByIdAndUpdate(id, { deletedAt: new Date() });
    }
}

module.exports = new UpcomingFilmService();
