'use strict';

var app = angular.module('myApp');

app.factory('LoginService', ['$http', function($http) {
  return {
    login : function(data) {
      return $http.post('/api/login', data);
    }
  };
}]);