'use strict';

var app = angular.module('myApp');

app.factory('Data', [function() {

  var data = {};

  return {
    getData: function() {
      return data;
    },
    setData: function(newData) {
      data = newData;
    },
    updateData: function(following) {
    	data.following = following.following;
    }
  };

}]);