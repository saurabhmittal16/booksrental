const axios = require('axios');
const Book = require('../models/book');
const VBook = require('../models/verifiedBook');

const url = 'https://www.googleapis.com/books/v1/volumes?q=isbn:';

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

exports.getBookByISBN = async (req, res) => {
    const isbn = req.query.isbn;

    // if no isbn -> return null
    if (!isbn) return null;

    try {
        // check verified books collection by isbn
        const found = await VBook.findOne({ isbn: isbn }, { _id: 0 });
        if (found) {
            // if book found, return
            console.log("Verified Book exists");
            return found;
        } else {
            try {
                // fetch book details from Books API
                let result = await axios.get(`${url + isbn}`);

                result = result.data;
                if (result.totalItems) {
                    result = result.items[0].volumeInfo;
                    const data = {
                        name: result.title,
                        author: result.authors.join(", "),
                        genre: result.categories ? result.categories : ["Others"],
                        description: result.description.substring(0,500),
                        image: result.imageLinks.thumbnail,
                        isbn: isbn
                    }
                    try {
                        // add fetched book to verified collection
                        const createdBook = await VBook.create(data);

                        // if book creation fails -> throw error
                        if (!createdBook) {
                            throw('Book creation failed');
                        }
                        console.log("Verified book created");
                    } catch (err) {
                        console.log(err);
                    } finally {
                        // return book data even if book isn't added to collection
                        return data;
                    }
                } else {
                    // if no result from API -> return null
                    return null;
                }
            } catch (err) {
                console.log(err);
                return res.code(500);
            }
        }
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
        const updatedBook = await Book.findOneAndUpdate({ _id: id }, req.body, {
            new: true
        });
        console.log("Listing updated successfuly");
        if (updatedBook) {
            await updatedBook.save();
            return {
                success: true
            }
        }
        return res.code(500);
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