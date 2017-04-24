'use strict';

var Login = require('../controllers/login.controller');

module.exports = function(app) {

  app.post('/api/login', Login.login);

};