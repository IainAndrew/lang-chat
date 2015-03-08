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
    'ui.router'
  ])
  .config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {
    $urlRouterProvider
      .otherwise('/');

    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'views/main.html'
      });
  }]);
