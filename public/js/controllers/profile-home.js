'use strict';

var app = angular.module('myApp');

app.controller('HomeController', function($scope, $state, $cookies, Data, UserService) {

    var info = Data.getData();

    var userId = $cookies.get('id');

    if(Object.keys(info).length === 0) {
      UserService.getById(userId)
      .success(function(response) {
          $scope.profile = {
            username: response.message[0].username,
            email: response.message[0].email,
            followers: response.message[0].followers.length,
            following: response.message[0].following.length
          };
          $scope.status = {
            username: $scope.profile.username,
            status: ''
          };
      });
    } else {
      $scope.profile = {
        username: info.name,
        email: info.email,
        followers: info.followers.length,
        following: info.following.length
      };
      $scope.status = {
        username: $scope.profile.username,
        status: ''
      };
    }

    $scope.logout = function() {
        $cookies.put('username', '');
        $cookies.put('email', '');
        $cookies.put('followers.length', '');
        $cookies.put('following.length', '');
        $state.go('login');
    };

    $scope.update = function() {
      console.log($scope.status);
      UserService.updateStatus($scope.status)
      .success(function(response) {
        if(response.success === true) {
          alert('status updated');
        } else {
          alert('error');
        }
      });
    };
    
});