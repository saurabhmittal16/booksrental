const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    uid: String,
    name: String,
    author: String,
    genre: String,
    isbn: {
        type: String,
        unique: true
    },
    available: {
        type: Boolean,
        default: false
    },
    start: Date,
    end: Date,
    // Concat name, author, genre and isbn to run search using regexp
    query: String
}, {
    versionKey: false
});

module.exports = mongoose.model('Book', bookSchema);