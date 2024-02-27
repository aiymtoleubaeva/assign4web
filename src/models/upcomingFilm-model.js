const mongoose = require('mongoose');

const upcomingFilmSchema = new mongoose.Schema({
    title: {
        en: { type: String, required: true },
        ru: { type: String}
    },
    description: {
        en: { type: String, required: true },
        ru: { type: String }
    },
    releaseDate: { type: Date, required: true },
    images: [{ type: String, required: true }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date }
});

module.exports = mongoose.model('UpcomingFilm', upcomingFilmSchema);
