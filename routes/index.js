const route = require('express').Router();

route.use('/api', require('./api'));
route.use('/login', require('./login'));
route.use('/signup', require('./signup'));

module.exports = route;
