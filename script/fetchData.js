const axios = require('axios');
const parseXML = require('./xml');

/* Script to fetch and combine data from Books API and GoodReads API */
const config = require('../config');

const url = 'https://www.googleapis.com/books/v1/volumes?q=isbn:';
const goodURL = (isbn) => `https://www.goodreads.com/book/isbn/${isbn}?key=${config.key}`

const main = async (isbn) => {
    try {
        let finalData = {
            name: null,
            author: null,
            genre: null,
            description: null,
            image: null,
            isbn: null,
            rating: null,
            reviews: null,
            url: null,
            empty: true
        };

        // Requests to both APIs
        let googleData = await axios.get(`${url + isbn}`);
        let goodReadsData = await axios.get(goodURL(isbn));
        
        // GET request -> standard response
        googleData = googleData.data;
        goodReadsData = goodReadsData.data;

        // parse XML to JSON
        goodReadsData = await parseXML(goodReadsData);
        
        // If google API has data, set finalData
        if (googleData.totalItems) {
            let result = googleData.items[0].volumeInfo;
            finalData = {
                name: result.title,
                author: result.authors.join(", "),
                genre: result.categories ? result.categories : ["Others"],
                description: result.description ? result.description.substring(0,500) : result.title,
                image: result.imageLinks.thumbnail,
                isbn: isbn,
                empty: false
            }
        }

        // If GoodReads has data only populate null fields and rating,reviews and url
        if (goodReadsData) {
            goodReadsData = goodReadsData.GoodreadsResponse.book;
            finalData = {
                name: finalData.name ? finalData.name : goodReadsData.title,
                author: finalData.author ? finalData.author : goodReadsData.authors.author.name,
                genre: finalData.genre ? finalData.genre : ["Good Reads"],
                description: finalData.description ? finalData.description : goodReadsData.description,
                image: finalData.image ? finalData.image : goodReadsData.image_url,
                isbn: isbn,
                rating: goodReadsData.average_rating,
                reviews: goodReadsData.ratings_count,
                url: goodReadsData.url
            }
        }

        // return finalData
        // if none API have data, returns object with null fields
        return finalData;
    } catch (err) {
        return new Error("Could not fetch data from ISBN");
    }
}

module.exports = main;