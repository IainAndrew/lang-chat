'use strict';

/**
 * @ngdoc function
 * @name langChatApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the App
 */

angular.module('App')
  .controller('LoginCtrl', function ($scope, $rootScope, $firebaseArray, $firebaseObject, $routeParams, $location) {
    var chatRoom = new Firebase($rootScope.URL + $routeParams.roomId);
    var roomSync = $firebaseObject(chatRoom);
    $scope.roomInfo = roomSync;

    var msgsSync = $firebaseArray(chatRoom.child('chatMessages'));
    $scope.chatMessages = msgsSync;

    $scope.passwordCorrect = false;
    roomSync.$loaded(function() {
      $scope.passwordRequired = !roomSync.noPassword;
      $scope.passwordSubmit = function() {
        if ($scope.passwordEntered === roomSync.passwordVal) {
          console.log('correct');
          $scope.passwordCorrect = true;
          $location.path($location.url().replace('/login', ''));
        } else {
          alert('incorrect');
          $scope.passwordCorrect = false;
          $scope.passwordEntered = '';
        }
      };
    });
  });
