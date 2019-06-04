const Book = require('../models/book');

exports.addBook = async (req, res) => {
    const uid = req.decoded.user_id;

    try {
        const createdBook = await Book.create({
            uid: uid,
            ...req.body
        });

        if (createdBook) {
            console.log("Listing added successfuly");
            return {
                success: true
            }
        } else {
            console.log("Error");
            return res.code(500).send({
                message: "Book creation failed"
            });
        }

    } catch (err) {
        console.log(err);
        return res.code(500);
    }
}

exports.getBooks = async (req, res) => {
    const { page } = req.query;

    const options = {
        page: parseInt(page, 10) || 1,
        limit: 2
    }

    try {
        const foundBooks = await Book
            .find({})
            .skip((options.page - 1) * options.limit)
            .limit(options.limit)
            .sort({_id: -1});

            return {
                data: foundBooks,
                page: options.page,
                last: foundBooks.length < options.limit
            };

    } catch (err) {
        console.log(err);
        return res.code(500);
    }
}

exports.getBook = async (req, res) => {
    const { id } = req.params;

    try {
        const foundBook = await Book
            .findOne({
                _id: id
            });

            return foundBook;

    } catch (err) {
        console.log(err);
        return res.code(500);
    }
}

exports.updateBook = async (req, res) => {
    const { id } = req.params;

    try {
        const updatedBook = await Book.findOneAndUpdate({ _id: id }, req.body);
        console.log("Listing updated successfuly");
        return {
            success: true
        }
    } catch (err) {
        console.log(err);
        return res.code(500);
    }
}

exports.removeBook = async (req, res) => {
    const { id } = req.params;

    try {
        const removeBook = await Book.findOneAndRemove({ _id: id });
        
        if (!removeBook) {
            return res.code(500).send({
                message: "No such book"
            });
        }
        console.log("Listing deleted successfuly");
        return {
            success: true
        }

    } catch (err) {
        console.log(err);
        return res.code(500);
    }
}

exports.getBooksByUser = async (req, res) => {
    const uid = req.decoded.user_id;

    const options = {
        page: parseInt(page, 10) || 1,
        limit: 2
    }

    try {
        const foundBooks = await Book
            .find({
                uid: uid
            })
            .skip((options.page - 1) * options.limit)
            .limit(options.limit)
            .sort({_id: -1});

            return {
                data: foundBooks,
                page: options.page,
                last: foundBooks.length < options.limit
            };

    } catch (err) {
        console.log(err);
        return res.code(500);
    }
}