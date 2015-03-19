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
    'ngRoute'
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
  }]);
  // .config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {
  //   $urlRouterProvider
  //     .otherwise('/');

  //   $stateProvider
  //     .state('main', {
  //       url: '/',
  //       templateUrl: 'views/main.html',
  //       controller: 'HomeCtrl'
  //     })
  //     .state('chat', {
  //       url: '/chat/:roomid',
  //       templateUrl: 'views/chat.html',
  //       controller: 'ChatCtrl'
  //     });
  // }]);
