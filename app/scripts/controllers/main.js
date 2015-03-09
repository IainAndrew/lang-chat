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
     
    $scope.addMessage = function(e) {
      //if (e.keyCode != 13) return;
      $scope.messages.$add({
        user: $scope.name, 
        body: $scope.message
      });
      $scope.message = ""; // reset message input after
    }
  });
