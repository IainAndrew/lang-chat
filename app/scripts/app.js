'use strict';

/**
 * @ngdoc overview
 * @name langChatApp
 * @description
 * # App
 *
 * Main module of the application.
 */

angular
  .module('App', [
    'ui.router',
    'firebase',
    'ngRoute',
    'app.directives.spinner'
  ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/:roomId/:roomName/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/:roomId/:roomName', {
        templateUrl: 'views/chat.html',
        controller: 'ChatCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

  }])
  .run([ '$rootScope', function ($rootScope) {
    $rootScope.URL = 'https://lang-chat.firebaseio.com/chatRooms/';
    $rootScope.loggedIn = false;
    $rootScope.loading = false;
  }]);
