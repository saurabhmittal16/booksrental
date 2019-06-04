const Book = require('../models/book');

exports.basicSearch = async (req, res) => {
    let { query, status, page } = req.query;

    const options = {
        page: parseInt(page, 10) || 1,
        limit: 2
    }

    try {
        // use regexp to match surveys with received search query
        const books = await Book.find({
            query: {
                $regex: new RegExp(query, 'i')
            },
        }, {
            uid: 0,
            query: 0,
        })
        .skip((options.page - 1) * options.limit)
        .limit(options.limit);
        
        return {
            data: books,
            page: options.page,
            last: books.length < options.limit
        };

    } catch (err) {
        console.log(err);
        return res.code(500);
    }
}