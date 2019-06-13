const Book = require('../models/book');
const VBook = require('../models/verifiedBook');
const faker = require('faker');
const fs = require('fs');

const other_data = fs.readFileSync('../verified.json');
const genres = JSON.parse(other_data).list;

// const data = require('./data');
// const init = async () => {
//     const result = await Book.find();
//     result.forEach(
//         async doc => {
//             doc.available = true;
//             await doc.save();
//         }
//     )
// }

const randomGenre = () => {
    const defined_genres = require('../genres.json').list;
    const a = Math.floor(Math.random() * defined_genres.length);
    const b = Math.floor(Math.random() * defined_genres.length);
    return [
        defined_genres[a],
        defined_genres[b]
    ];
}

const init = async () => {
    genres.forEach(
        async genre => {
            let foundBooks = await VBook.find({ genre: genre });
            console.log(`${genre} -> ${foundBooks.length}`);
            foundBooks.forEach(
                async book => {
                    const temp = {
                        name: book.name,
                        author: book.author,
                        genre: book.genre.concat(randomGenre()),
                        image: book.image,
                        description: book.description,
                        isbn: book.isbn,
                        uid: "vLqohwiQCzeYQI8FqOKLwkJoFv22",
                        available: true,
                        start: faker.date.recent(),
                        end: faker.date.future()
                    };
                    const listing = await Book.create(temp);
                    console.log(listing._id);
                }
            );
        }
    );
}

const another = async () => {
    let foundBooks = await VBook.find({ genre: "Fiction" });
    const book = foundBooks[0];
    for(let i=0; i<6; i++)
    {
        const temp = {
            name: book.name,
            author: book.author,
            genre: book.genre.concat(randomGenre()),
            image: book.image,
            description: book.description,
            isbn: book.isbn,
            uid: "vLqohwiQCzeYQI8FqOKLwkJoFv22",
            available: true,
            start: faker.date.recent(),
            end: faker.date.future()
        };
        const listing = await Book.create(temp);
        console.log(listing._id);
    }
}

const mongoose = require('mongoose');
const mongo_url = "mongodb://localhost:27017/booksapp";

mongoose.connect(mongo_url, {useNewUrlParser: true, useFindAndModify: false})
    .then(
        async () => {
            console.log("Connected to DB");
            // await init();
            await another();
        }
    )
    .catch(err => console.log(err.message));