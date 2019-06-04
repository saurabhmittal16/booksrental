const controller = require('../controller/feed');

module.exports = [
    {
        method: 'GET',
        url: '/api/v1/genre',
        handler: controller.getGenres
    },
    {
        method: 'GET',
        url: '/api/v1/feed',
        handler: controller.getFeed
    }
]