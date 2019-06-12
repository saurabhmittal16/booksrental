const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    uid: String,
    name: String,
    author: String,
    genre: [String],
    image: String,
    description: String,
    isbn: {
        type: String,
        unique: true
    },
    available: {
        type: Boolean,
        default: true
    },
    start: Date,
    end: Date,
    // Concat name, author, genre and isbn to run search using regexp
    query: String
}, {
    versionKey: false
});

bookSchema.pre('save', function(next) {
    let book = this;
    book.query = `${book.name}; ${book.author}; ${book.isbn}; ${book.genre}`;
    next();
});

module.exports = mongoose.model('Book', bookSchema);