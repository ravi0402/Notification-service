'use strict';

var User = require('../models/user.model');

module.exports = {

  login : function(req, res) {
    User.findOne({
      email: req.body.email
    }, function(err, user) {

      if(err) {
        res.json({ success: false, message: err });
      } else {
        if(!user) {
          res.json({ success: false, message: 'Email ID not found' });
        } else if(user) {
          user.comparePassword(req.body.password, function(err, isMatch) {
            if(err) {
              res.json({ success: false, message: err });
            } else if(isMatch === false) {
              res.json({ success: false, message: 'Invalid Password' });  
            } else {
              var userObj = {
                _id: user._id,
                name: user.username,
                email: user.email,
                createdAt: user.createdAt,
                followers: user.followers,
                following: user.following
              };
              res.json({ success: true, message: userObj });
            }
          });
        }
      }
    });
  }
};