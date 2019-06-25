const controller = require('../controller/rent');

module.exports = [
    {
        method: 'GET',
        url: '/api/v1/activity/rent',
        handler: controller.getRents
    },
    {
        method: 'GET',
        url: '/api/v1/activity/lent',
        handler: controller.getLents
    }
];