const Book = require('../models/book');
const data = require('./data');

const init = async () => {
    const result = await Book.find();
    result.forEach(
        async doc => {
            doc.available = true;
            await doc.save();
        }
    )
}

const mongoose = require('mongoose');
const mongo_url = "mongodb://localhost:27017/booksapp";

mongoose.connect(mongo_url, {useNewUrlParser: true, useFindAndModify: false})
    .then(
        async () => {
            console.log("Connected to DB");
            await init();
        }
    )
    .catch(err => console.log(err.message));