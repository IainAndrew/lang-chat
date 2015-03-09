'use strict';

/**
 * @ngdoc function
 * @name langChatApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the App
 */
angular.module('App')
  .controller('MainCtrl', function ($scope, $firebaseArray) {
    var ref = new Firebase('https://gptgzo9lwy0.firebaseio-demo.com/');
    $scope.messages = $firebaseArray(ref);
    $scope.usernameSelected = false;
    $scope.stayAnon = false;
    $scope.anonUsername = 'anon' + Math.floor((Math.random()*90000)+10000);
    $scope.submit = function(e) {
      //if (e.keyCode != 13) return;
      if ($scope.stayAnon) {
        $scope.name = $scope.anonUsername;
      }
      $scope.messages.$add({
        user: $scope.name, 
        body: $scope.message
      });
      $scope.usernameSelected = true;
      $scope.message = ""; // reset message input after submitted
    }
  });
