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
        templateUrl: 'views/main.html',
        controller: 'HomeCtrl'
      })
      .when('/chat/:roomId/:roomName', {
        templateUrl: 'views/chat.html',
        controller: 'ChatCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

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
