'use strict';

var User = require('../models/user.model');

module.exports = {

  getUsers: function(req, res) {

    User.find(function(err, users) {
        if(err) res.send(err);

        res.json({success: true, message: users});
      });
  },

  getUserById: function(req, res) {

    User.find({_id: req.params.id}, function(err, users) {
      if(err) res.send(err);

      res.json({success: true, message: users});
    });
  },

  addUser: function(req, res) {

    var user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });

    user.save(function(err) {
      if (err) {
        if(err.name === 'ValidationError') {

          res.json({success: false, message: {
            username: err.errors.username.message,
            password: err.errors.password.message,
            email: err.errors.email.message
          }});
        } else if(err.name === 'MongoError' || err.code === 11000) {

          res.json({success: false, message: err.errmsg});
        } else {

          res.json({success: false, message: err});
        }
      } else {
        res.json({success: true, message: 'user created'});
      }
    });
  },

  follow: function(req, res) {

    User.findByIdAndUpdate(req.body.followingId, { $addToSet: { "followers": { username: req.body.follower} } }, {new: true}, function(err, newFollowing) {
      if(err) {
        res.json({ success: false, message: err });
      } else {
        User.findByIdAndUpdate(req.body.followerId, { $addToSet: { "following": { username: req.body.following} } }, {new: true}, function(err, newFollower) {
          if(err) {
            res.json({ success: false, message: err });
          } else {
            res.json({ success: true, message: { following: newFollowing, follower: newFollower } });
          }
        });
      }
    });
  },

  unfollow: function(req, res) {

    User.findByIdAndUpdate(req.body.followingId, { $pull: { "followers": { username: req.body.follower} } }, {new: true}, function(err, newFollowing) {
      if(err) {
        res.json({ success: false, message: err });
      } else {
        User.findByIdAndUpdate(req.body.followerId, { $pull: { "following": { username: req.body.following} } }, {new: true}, function(err, newFollower) {
          if(err) {
            res.json({ success: false, message: err });
          } else {
            res.json({ success: true, message: { following: newFollowing, follower: newFollower } });
          }
        });
      }
    });
  }
};