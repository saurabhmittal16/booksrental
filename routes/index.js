const authRoutes = require('./auth');
const bookRoutes = require('./book');
const searchRoutes = require('./search');

module.exports = [].concat(
    authRoutes,
    bookRoutes,
    searchRoutes
);