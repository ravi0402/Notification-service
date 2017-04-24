'use strict';

var app = angular.module('myApp');

app.controller('FriendsController', function($scope, $cookies, Data, UserService) {

    var info = Data.getData();

    var userId = $cookies.get('id');
    var userName = $cookies.get('username');

    var userData = {
      followingId: '',
      following: '',
      followerId: userId,
      follower: userName
    };

    if(Object.keys(info).length === 0) {
      UserService.getById(userId)
      .success(function(response) {
          $scope.profile = {
            username: response.message[0].username,
            followersList: response.message[0].followers,
            followingList: response.message[0].following
          };

          UserService.get()
          .success(function(response) {
            $scope.tempFriends = response.message;
            
            angular.forEach($scope.profile.followingList, function(resOne) {
              angular.forEach($scope.tempFriends, function(resThree) {
                if(resThree.username === resOne.username) {
                  resThree.isFollowing = true;
                } else {
                  resThree.isFollowing = false;
                }
              });
            });

            angular.forEach($scope.profile.followersList, function(resTwo) {
              angular.forEach($scope.tempFriends, function(resThree) {
                if(resThree.username === resTwo.username) {
                  resThree.isFollower = true;
                } else {
                  resThree.isFollower = false;
                }
              });
            });
            $scope.friends = $scope.tempFriends;
          });
      });
    } else {
      $scope.profile = {
        username: info.name,
        followersList: info.followers,
        followingList: info.following
      };

      UserService.get()
      .success(function(response) {
        $scope.tempFriends = response.message;
        angular.forEach($scope.profile.followingList, function(resOne) {
          angular.forEach($scope.tempFriends, function(resThree) {
            if(resThree.username === resOne.username) {
              resThree.isFollowing = true;
            } else {
              resThree.isFollowing = false;
            }
          });
        });

        angular.forEach($scope.profile.followersList, function(resTwo) {
          angular.forEach($scope.tempFriends, function(resThree) {
            if(resThree.username === resTwo.username) {
              resThree.isFollower = true;
            } else {
              resThree.isFollower = false;
            }
          });
        });
        $scope.friends = $scope.tempFriends;
      });
    }

    $scope.follow = function(name, id) {
      userData.followingId = id;
      userData.following = name;
      UserService.follow(userData)
      .success(function(response) {
        Data.updateData(response.message.follower);
      });
    };

    $scope.unfollow = function(name, id) {
      userData.followingId = id;
      userData.following = name;
      UserService.unfollow(userData)
      .success(function(response) {
        Data.updateData(response.message.follower);
      });
    };

});