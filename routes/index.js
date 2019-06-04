const authRoutes = require('./auth');
const bookRoutes = require('./book');
const searchRoutes = require('./search');
const feedRoutes = require('./feed');

module.exports = [].concat(
    authRoutes,
    bookRoutes,
    searchRoutes,
    feedRoutes
);