module.exports = {
    addBook: {
        body: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                author: { type: 'string' },
                genre: { type: 'string' },
                isbn: { type: 'string' },
                start: { 
                    type: 'string',
                    format: 'date'
                },
                end: { 
                    type: 'string',
                    format: 'date'
                }
            },
            required: ['name', 'author', 'genre', 'isbn', 'start', 'end']
        }
    }
}