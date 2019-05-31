const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: String,
    author: String,
    genre: String,
    isbn: {
        type: String,
        unique: true
    },
    available: Boolean,
    start: Date,
    end: Date
}, {
    versionKey: false
});

module.exports = mongoose.model('Book', bookSchema);