const authRoutes = require('./auth');
const bookRoutes = require('./book');

module.exports = [].concat(
    authRoutes,
    bookRoutes
);