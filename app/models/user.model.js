'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
const saltRounds = 10;

var UserSchema = new Schema({

  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: [true, 'Username already exist']
  },
  email: {
    type: String,
    required: [true, 'Email id is required'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    unique: [true, 'Email already exist']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  followers: [
    {
      username: String
    }
  ],
  following: [
    {
      username: String
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

UserSchema.pre('save', function(next) {

  var user = this;

  // generate salt
  bcrypt.genSalt(saltRounds, function(err, salt) {
    if(err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if(err) return next(err);

      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function(userPassword, cb) {
  bcrypt.compare(userPassword, this.password, function(err, isMatch) {
    if(err) return cb(err);

    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);