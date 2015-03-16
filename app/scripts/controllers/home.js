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
    // $scope.rooms = sync;
    var roomNameChosen = false;
    $scope.noPassword = false;
    $scope.password = '';

    $scope.newRoom = function() {
      sync.$add({
        roomName: $scope.roomName,
        noPassword: $scope.noPassword,
        password: $scope.password
      }).then(function(ref) {
        var id = ref.key();
        $location.path('/' + id + '/' + $scope.roomName.toLowerCase().replace(' ', '-'));
      });
      console.log($scope.roomName + ' created');
      roomNameChosen = true;
    };

    // $scope.joinChat = function(room) {
    //   $location.path('/' + $scope.rooms[room].$id + '/' + $scope.rooms[room].roomName.toLowerCase().replace(' ', '-'));
    // };
  });
