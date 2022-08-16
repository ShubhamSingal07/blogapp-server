const route = require('express').Router();

route.use('/article', require('./article'));
route.use('/comment', require('./comment'));

module.exports = route;
