const genres = require('../genres');

exports.getGenres = async (req, res) => {
    return genres;
}

exports.getFeed = async (req, res) => {
    const url = '/api/v1/feed?';
    const start = parseInt(req.query.start, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 5;

    const requiredGenres = genres.slice(start, start+limit);
    let response = {
        limit: limit,
        start: start,
        size: requiredGenres.length,
        next: requiredGenres.length < limit ? null : `${url}start=${start+limit}&limit=${limit}`,
        results: requiredGenres
    }

    return response;
}