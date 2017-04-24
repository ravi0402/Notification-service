'use strict';

var Status = require('../controllers/status.controller');

module.exports = function(app) {

  app.post('/api/status', Status.addStatus);

  app.post('/api/status/get', Status.getStatus);

};