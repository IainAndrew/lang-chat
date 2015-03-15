'use strict';

/**
 * @ngdoc function
 * @name langChatApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the App
 */

angular.module('App')
  .controller('MainCtrl', function ($rootScope, $scope) {
    $rootScope.URL = 'https://lang-chat.firebaseio.com/';
    var ref = new Firebase($rootScope.URL);
  });
