'use strict';

var app = angular.module('myApp');

app.controller('NotificationsController', function($scope, $cookies, UserService, Data) {

  var info = Data.getData();
  var socket = io.connect();

  var userId = $cookies.get('id');

  if(Object.keys(info).length === 0) {

    UserService.getById(userId)
    .success(function(response) {
      $scope.data = {
        _id: response.message[0]._id
      };

      $scope.following = {
        name: response.message[0].following
      };

      socket.on('status', function(data) {
        angular.forEach($scope.following.name, function(foll) {
          if(foll.username === data.username) {
            $scope.$apply(function() {
              $scope.messages.push(data);
            });
          }
        });
      });

      UserService.getStatus($scope.data)
      .success(function(response) {
        if(response.success === true) {
          $scope.messages = response.message;
        }
      });
    });
  } else {

    $scope.data = {
      _id: info._id
    };

    $scope.following = {
      name: info.following
    };

    socket.on('status', function(data) {
      angular.forEach($scope.following.name, function(foll) {
        if(foll.username === data.username) {
          $scope.$apply(function() {
            $scope.messages.push(data);
          });
        }
      });
    });

    UserService.getStatus($scope.data)
    .success(function(response) {
      if(response.success === true) {
        $scope.messages = response.message;
      }
    });
  }
});