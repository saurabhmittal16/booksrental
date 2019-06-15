module.exports = {
    addBook: {
        body: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                author: { type: 'string' },
                genre: { 
                    type: 'array',
                    items: {
                        type: 'string'
                    },
                    minItems: 1
                },
                description: { type: 'string' },
                image: { type: 'string' },
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
            required: ['name', 'author', 'description', 'genre', 'start', 'end']
        }
    }
}