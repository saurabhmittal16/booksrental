const authRoutes = require('./auth');
const bookRoutes = require('./book');
const searchRoutes = require('./search');
const feedRoutes = require('./feed');
const requestRoutes = require('./request');

module.exports = [].concat(
    authRoutes,
    bookRoutes,
    searchRoutes,
    feedRoutes,
    requestRoutes
);