const controller = require('../controller/book');
const schema = require('../schema/book');

module.exports = [
    {
        method: 'POST',
        url: '/api/v1/book',
        schema: schema.addBook,
        handler: controller.addBook
    },
    {
        method: 'GET',
        url: '/api/v1/book',
        handler: controller.getBooks
    },
    {
        method: 'GET',
        url: '/api/v1/book/:id',
        handler: controller.getBook
    },
    {
        method: 'PUT',
        url: '/api/v1/book/:id',
        handler: controller.updateBook
    },
    {
        method: 'DELETE',
        url: '/api/v1/book/:id',
        handler: controller.removeBook
    },
    {
        method: 'GET',
        url: '/api/v1/book/user',
        handler: controller.getBooksByUser
    }
]