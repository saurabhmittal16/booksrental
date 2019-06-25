const authRoutes = require('./auth');
const bookRoutes = require('./book');
const searchRoutes = require('./search');
const feedRoutes = require('./feed');
const requestRoutes = require('./request');
const rentRoutes = require('./rent');

module.exports = [].concat(
    authRoutes,
    bookRoutes,
    searchRoutes,
    feedRoutes,
    requestRoutes,
    rentRoutes
);