const controller = require('../controller/auth');

module.exports = [
    {
        method: 'GET',
        url: '/api/v1/auth',
        handler: controller.auth,
    }
]