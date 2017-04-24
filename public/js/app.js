'use strict';

var app = angular.module('myApp', [
  'ui.router',
  'ngCookies'
]);

app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/login');

  $stateProvider
    .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginController'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'views/signup.html',
      controller: 'UserController'
    })
    .state('profile', {
      templateUrl: 'views/profile.html'
    })
    .state('profile.detail', {
      url: '/profile',
      views: {
        'home': {
          templateUrl: 'views/profile-home.html',
          controller: 'HomeController'
        },
        'notifications': {
          templateUrl: 'views/profile-notification.html',
          controller: 'NotificationsController'
        },
        'friends': {
          templateUrl: 'views/profile-friend.html',
          controller: 'FriendsController'
        }
      }
    });
});