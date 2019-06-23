const schema = require('../schema/request');
const controller = require('../controller/request');

module.exports = [
    {
        method: 'POST',
        url: '/api/v1/request',
        schema: schema.createRequest,
        handler: controller.createRequest
    },
    {
        method: 'POST',
        url: '/api/v1/request/reject',
        schema: schema.rejectRequest,
        handler: controller.rejectRequest
    },
    {
        method: 'POST',
        url: '/api/v1/request/accept',
        schema: schema.acceptRequest,
        handler: controller.acceptRequest
    },
    {
        method: 'POST',
        url: '/api/v1/request/confirm',
        schema: schema.confirmRequest,
        handler: controller.confirmRequest
    },
    {
        method: 'GET',
        url: '/api/v1/notification/rent',
        handler: controller.rentNotifications
    },
    {
        method: 'GET',
        url: '/api/v1/notification/lent',
        handler: controller.lentNotification
    }
]