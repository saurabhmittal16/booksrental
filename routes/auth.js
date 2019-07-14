const controller = require('../controller/auth');
const schema = require('../schema/auth');

module.exports = [
    {
        method: 'POST',
        url: '/api/v1/auth',
        handler: controller.auth,
    },
    {
        method: 'POST',
        url: '/api/v1/profile',
        schema: schema.finishProfile,
        handler: controller.finishProfile,
    },
    {
        method: 'GET',
        url: '/api/v1/profile',
        handler: controller.getProfile,
    }
]