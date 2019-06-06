const Book = require('../models/book');
const genres = require('../genres');

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
    const url = '/api/v1/feed?';
    const url_genre = '/api/v1/feed/genre?';

    // start -> starting entry for genre
    const start = parseInt(req.query.start, 10) || 0;

    // limit -> number of genres to send
    const limit = parseInt(req.query.limit, 10) || 5;
    
    // genre_limit -> number of results to send for each genre
    const genre_limit = parseInt(req.query.subsize, 10) || 5;

    // slice genres according to start and limit
    const requiredData = genres.slice(start, start+limit);

    // asyncForEach -> async function for each genre required
    await asyncForEach(requiredData, async function(genre) {
        try {

            // data -> find books that are available and of the given genre
            const data = await Book
                .find({
                    genre: genre,
                    available: true
                }, {
                    uid: 0,
                    query: 0,
                    start: 0,
                    end: 0,
                    available: 0
                })
                // limit the number of results
                .limit(genre_limit);


            // return genre name, limit, start, size, next url and data
            return {
                title: genre,
                limit: 5,
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
    const url_genre = '/api/v1/feed/genre?';

    // start -> starting point for books
    const start = parseInt(req.query.start, 10) || 0;
    
    // limit -> number of results to send
    const limit = parseInt(req.query.limit, 10) || 5;

    // genre -> genre of book, null by default so no results
    const genre = req.query.genre;

    try {
        const data = await Book
            .find({
                genre: genre,
                available: true
            }, {
                uid: 0,
                query: 0,
                start: 0,
                end: 0,
                available: 0,
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