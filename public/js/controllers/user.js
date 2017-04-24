'use strict';

var app = angular.module('myApp');

app.controller('UserController', function($scope, $state, UserService) {
    console.log('user controller');

    $scope.userData = {
      username: '',
      email: '',
      password: ''
    };

    $scope.errorMessage = '';

    $scope.addUser = function() {
      UserService.create($scope.userData)
      .success(function(response) {
        if(response.success === true) {
          alert('user created');
          $state.go('login');
        } else {
          $scope.errorMessage = response.message;
        }
      });
    };
});