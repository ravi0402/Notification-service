'use strict';

var app = angular.module('myApp');

app.factory('UserService', ['$http', function($http) {
  return {
    get : function() {
      return $http.get('/api/users');
    },

    create : function(data) {
      return $http.post('/api/users', data);
    },

    getById : function(id) {
      return $http.get('/api/users/'+id);
    },

    follow : function(data) {
      return $http.post('/api/users/follow', data);
    },

    unfollow : function(data) {
      return $http.post('/api/users/unfollow', data);
    },

    updateStatus : function(data) {
      return $http.post('/api/status', data);
    },

    getStatus : function(id) {
      return $http.post('/api/status/get', id);
    }
  };
}]);