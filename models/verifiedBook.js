const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: String,
    author: String,
    genre: [String],
    image: String,
    description: String,
    isbn: String,
}, {
    versionKey: false
});

module.exports = mongoose.model('VerifiedBook', bookSchema);