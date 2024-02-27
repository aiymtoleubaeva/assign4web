const superheroService = require('../services/superhero-service')

class SuperheroController {
    async superheroSearchPage(req, res, next) {
        try {
            let superheroData = null;
            if (req.method === "POST") {
                const { name } = req.body;
                superheroData = await superheroService.getSuperheroByName(name);
                // Filter out the exact match and newest character by first appearance
                superheroData = superheroService.filterNewestExactMatch(superheroData, name);
            }
            res.render('superhero/search-superhero', { superhero: superheroData, errorMessage: req.query.error });
        } catch (error) {
            next(error);
        }
    }

    async getSuperheroActors(req, res, next) {
        try {
            const superheroId = req.params.superheroId;
            const superheroData = await superheroService.getSuperheroById(superheroId);
            const actorDetails = await superheroService.getSuperheroActors(superheroData.name);
            res.render('superhero/superhero-actors', { actors: actorDetails, superhero: superheroData });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new SuperheroController();