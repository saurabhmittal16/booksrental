const controller = require('../controller/admin');

module.exports = [
    {
        method: 'POST',
        url: '/api/v1/admin/login',
        handler: controller.login
    },
    {
        method: 'GET',
        url: '/api/v1/admin/rents',
        handler: controller.getRents
    },
    {
        method: 'POST',
        url: '/api/v1/admin/status',
        handler: controller.updateStatus
    },
    {
        method: 'GET',
        url: '/api/v1/admin/mobile/:mobile',
        handler: controller.getUID
    },
    {
        method: 'POST',
        url: '/api/v1/admin/book',
        handler: controller.addBook
    }
]