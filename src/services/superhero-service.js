const axios = require('axios');

class SuperheroService {
    async getSuperheroByName(name) {
        const url = `https://superheroapi.com/api/122123851352189809/search/${name}`;
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.error);
        }
    }

    async getSuperheroById(id) {
        const url = `https://superheroapi.com/api/122123851352189809/${id}`;
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.error);
        }
    }
    filterNewestExactMatch(data, name) {
        if (!data.results) return null;

        const exactMatches = data.results.filter(character => character.name.toLowerCase() === name.toLowerCase());
        if (exactMatches.length === 0) return null;

        exactMatches.sort((a, b) => {
            const aYear = parseInt(a.biography['first-appearance'].match(/\d+/g), 10);
            const bYear = parseInt(b.biography['first-appearance'].match(/\d+/g), 10);
            return bYear - aYear;
        });

        return exactMatches[0];
    }

    async getSuperheroActors(superheroName) {
        const apiKey = process.env.OMDB_API_KEY;
        const searchUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(superheroName)}&type=movie`;
    
        try {
            const searchResponse = await axios.get(searchUrl);
            if (searchResponse.data.Response === 'True') {
    
                const moviesDetailsPromises = searchResponse.data.Search.map(movie => {
                    const detailsUrl = `http://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`;
                    return axios.get(detailsUrl); // Don't await here
                });
    
                const moviesDetailsResponses = await Promise.all(moviesDetailsPromises);
    
           
                const moviesDetails = moviesDetailsResponses.map(detailsResponse => ({
                    poster: detailsResponse.data.Poster,
                    title: detailsResponse.data.Title,
                    year: detailsResponse.data.Year,
                    actors: detailsResponse.data.Actors.split(', ')
                }));
    
                return moviesDetails.filter(movie => movie.actors.length > 0);
            } else {
                return [];
            }
        } catch (error) {
            throw new Error(error.response.data.error);
        }
    }    
}

module.exports = new SuperheroService();
