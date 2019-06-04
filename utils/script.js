const Book = require('../models/book');
const data = require('./data');

const init = async () => {
    for(let i=1; i<data.length; i++) {
        await Book.create(data[i]);
    }
}

const mongoose = require('mongoose');
const mongo_url = "mongodb://localhost:27017/booksapp";

mongoose.connect(mongo_url, {useNewUrlParser: true, useFindAndModify: false})
    .then(
        () => {
            console.log("Connected to DB");
            init();
        }
    )
    .catch(err => console.log(err.message));