const controller = require('../controller/admin');

module.exports = [
    {
        method: 'POST',
        url: '/api/v1/admin/loigin',
        handler: controller.login
    }
]