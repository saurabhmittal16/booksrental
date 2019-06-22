module.exports = {
    createRequest: {
        body: {
            type: 'object',
            properties: {
                listing: { type: 'string' },
            },
            required: ['listing']
        }
    },

    rejectRequest: {
        body: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                reason: { type: 'string' }
            },
            required: ['id', 'reason']
        }
    },

    acceptRequest: {
        body: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                details: {
                    type: 'object',
                    properties: {
                        address: { type: 'string' },
                        mobile: { type: 'string' },
                        pickup: { type: 'string', format: 'date-time' }
                    }
                }
            }
        }
    },

    confirmRequest: {
        body: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                details: {
                    type: 'object',
                    properties: {
                        address: { type: 'string' },
                        mobile: { type: 'string' },
                        delivery: { type: 'string', format: 'date-time' }
                    }
                }
            }
        }
    }
}