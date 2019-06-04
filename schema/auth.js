module.exports = {
    finishProfile: {
        body: {
            type: 'object',
            properties: {
                mobile: {
                    type: 'string',
                    pattern: '[6-9][0-9]{9}',
                    minLength: 10,
                    maxLength: 10
                }
            },
            required: ['mobile']
        }
    },
}