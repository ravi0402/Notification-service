'use strict';

var Status = require('../models/status.model');
var User = require('../models/user.model');

module.exports = {

  addStatus: function(req, res) {

    var status = new Status({
      username: req.body.username,
      status: req.body.status
    });

    status.save(function(err) {
      if(err) {
        res.json({ success: false, message: err });
      } else {
        res.io.emit('status', { username: req.body.username, status: req.body.status });
        res.json({ success: true, message: 'status updated' });
      }
    });
  },

  getStatus: function(req, res) {

    User.findById(req.body._id, function(err, user) {
      if(err) {
        res.json({ success: false, message: err });
      } else {
        if(!user) {
          res.json({ success: false, message: 'invalid id' });
        } else {
          var list = user.following;
          var followingList = [];
          for(var a = 0; a < list.length; a++) {
            followingList.push(list[a].username);
          }
          Status.find({'username': {$in: followingList}}, function(err, statusList) {
            if(err) {
              res.json({ success: false, message: err });
            } else {
              res.json({ success: true, message: statusList });
            }
          });
        }
      }
    });
  }

};