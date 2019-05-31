const controller = require('../controller/auth');
const schema = require('../schema/auth');

module.exports = [
    {
        method: 'GET',
        url: '/api/v1/auth',
        handler: controller.auth,
    },
    {
        method: 'POST',
        url: '/api/v1/auth/profile',
        schema: schema.finishProfile,
        handler: controller.finishProfile,
    }
]