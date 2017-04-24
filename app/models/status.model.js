'use strict';

var mongoose = require('mongoose');

module.exports = mongoose.model('Status', {
  
  username: {
    type: String,
    required: [true, 'Username is required']
  },
  status: {
  	type: String
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }

});