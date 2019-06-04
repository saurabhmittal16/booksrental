const controller = require('../controller/search');

module.exports = [
    {
        method: 'GET',
        url: '/api/v1/search',
        handler: controller.basicSearch
    }
]