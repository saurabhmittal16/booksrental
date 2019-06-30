const Book = require('../models/book');

exports.basicSearch = async (req, res) => {
    let { query, start, limit } = req.query;
    const url = `/search?query=${query}`

    start = parseInt(start, 10) || 0;
    limit = parseInt(limit, 10) || 5;

    try {
        // use regexp to match surveys with received search query
        const data = await Book.find({
            query: {
                $regex: new RegExp(query, 'i')
            },
        }, {
            uid: 0,
            query: 0,
        })
        .skip(start)
        .limit(limit);
        
        return {
            query: query,
            limit: limit,
            start: start,
            size: data.length,
            next: data.length < limit ? null : `${url}&start=${start+limit}&limit=${limit}`,
            results: data
        }
    } catch (err) {
        console.log(err);
        return res.code(500);
    }
}