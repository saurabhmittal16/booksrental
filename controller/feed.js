const VBook = require('../models/verifiedBook');
const genres = require('../genres.json').list;
const _ = require('../genres/index');

exports.getGenres = async (req, res) => {
    return genres;
}

// asyncForEach -> helper function to map over array and set callback result to element
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        array[index] = await callback(array[index]);
    }
}

exports.getFeed = async (req, res) => {
    let verifiedGenres = _.getGenres();
    const url = '/feed?';
    const url_genre = '/feed/genre?';

    // start -> starting entry for genre
    const start = parseInt(req.query.start, 10) || 0;

    // limit -> number of genres to send
    const limit = parseInt(req.query.limit, 10) || 5;
    
    // genre_limit -> number of results to send for each genre
    const genre_limit = parseInt(req.query.subsize, 10) || 5;

    // slice genres according to start and limit
    const requiredData = verifiedGenres.slice(start, start+limit);

    // asyncForEach -> async function for each genre required
    await asyncForEach(requiredData, async function(genre) {
        try {

            // data -> find books that are available and of the given genre
            const data = await VBook
                .find({
                    genre: genre,
                })
                // limit the number of results
                .limit(genre_limit);


            // return genre name, limit, start, size, next url and data
            return {
                title: genre,
                limit: genre_limit,
                start: 0,
                size: data.length,
                next: data.length < genre_limit ? null : `${url_genre}genre=${genre}&start=${genre_limit}&limit=${genre_limit}`,
                results: data
            }
        } catch (err) {
            console.log(err);
        }
    });

    // return result with limit, start, size, next url for genre and result
    return {
        limit: limit,
        start: start,
        size: requiredData.length,
        next: requiredData.length < limit ? null : `${url}start=${start+limit}&limit=${limit}`,
        results: requiredData
    }
}

exports.getFeedByGenre = async (req, res) => {
    const url_genre = '/feed/genre?';

    // start -> starting point for books
    const start = parseInt(req.query.start, 10) || 0;
    
    // limit -> number of results to send
    const limit = parseInt(req.query.limit, 10) || 5;

    // genre -> genre of book, null by default so no results
    const genre = req.query.genre;

    try {
        const data = await VBook
            .find({
                genre: genre,
            })
            .skip(start)
            .limit(limit);
        
        return {
            title: genre,
            start: start,
            limit: limit,
            size: data.length,
            next: data.length < limit ? null : `${url_genre}genre=${genre}&start=${start+limit}&limit=${limit}`,
            results: data
        }
    } catch (err) {
        console.log(err);
        return res.code(500);
    };
}