'use strict';

var app = angular.module('myApp');

app.controller('LoginController', function($scope, $state, $cookies, LoginService, Data) {
    $scope.loginData = {
      email: '',
      password: ''
    };

    $scope.login  =function() {
      LoginService.login($scope.loginData)
      .success(function(response) {
        if(response.success === true) {
          $cookies.put('id', response.message._id);
          $cookies.put('username', response.message.name);
          Data.setData(response.message);
          $state.go('profile.detail');
        } else {
          alert('Unable to login!');
        }
      });
    };
});