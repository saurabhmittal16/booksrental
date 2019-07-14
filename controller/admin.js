const config = require('../config');

exports.login = async (req, res) => {
    const password = req.body.password;

    if (password == config.admin)
        return { success: true };

    return res.code(500);
}