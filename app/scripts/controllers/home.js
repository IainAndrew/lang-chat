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
    var ref = new Firebase($rootScope.URL);
    var sync = $firebaseArray(ref);
    // $scope.rooms = sync;
    var roomNameChosen = false;
    $scope.noPassword = false;
    $scope.passwordVal = '';

    $scope.newRoom = function() {
      sync.$add({
        roomName: $scope.roomName,
        noPassword: $scope.noPassword,
        passwordVal: $scope.passwordVal
      }) .then(function(ref) {
        var id = ref.key();
        if (!$scope.noPassword) {
          $location.path('/' + id + '/' + $scope.roomName.toLowerCase().replace(' ', '-') + '/login');
        } else {
          $location.path('/' + id + '/' + $scope.roomName.toLowerCase().replace(' ', '-'));
        }
      });
      console.log($scope.roomName + ' created');
      roomNameChosen = true;
    };

    // $scope.joinChat = function(room) {
    //   $location.path('/' + $scope.rooms[room].$id + '/' + $scope.rooms[room].roomName.toLowerCase().replace(' ', '-'));
    // };
  });
