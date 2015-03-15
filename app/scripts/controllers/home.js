'use strict';

/**
 * @ngdoc function
 * @name langChatApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the App
 */

angular.module('App')
  .controller('HomeCtrl', function ($scope, $rootScope, $firebaseArray, $location) {
    var ref = new Firebase('https://lang-chat.firebaseio.com/chatRooms');
    var sync = $firebaseArray(ref);
    $scope.rooms = sync;

    $scope.newRoom = function() {
      sync.$add({
        roomName: $scope.roomName
      });
      console.log($scope.roomName + ' created');
    };

    $scope.joinChat = function(room) {
      $location.path('/chat/' + $scope.rooms[room].$id + '/' + $scope.rooms[room].roomName);
    };
  });
