'use strict';

var UserController = require('../controllers/user.controller');

module.exports = function(app) {

  /* api to get all the users */

  app.get('/api/users', UserController.getUsers);

  /* get user info by id*/
  app.get('/api/users/:id', UserController.getUserById);

  /* api to create a user */

  app.post('/api/users', UserController.addUser);

  app.post('/api/users/follow', UserController.follow);

  app.post('/api/users/unfollow', UserController.unfollow);
};