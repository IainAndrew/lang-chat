'use strict';

/**
 * @ngdoc function
 * @name langChatApp.controller:ChatCtrl
 * @description
 * # ChatCtrl
 * Controller of the App
 */

angular.module('App')
  .controller('ChatCtrl', function ($rootScope, $scope, $firebaseArray, $firebaseObject, $http, $routeParams, $location) {
    var chatRoom = new Firebase($rootScope.URL + $routeParams.roomId);
    var roomSync = $firebaseObject(chatRoom);
    $scope.roomInfo = roomSync;

    var msgsSync = $firebaseArray(chatRoom.child('chatMessages'));
    $scope.chatMessages = msgsSync;

    $scope.noTranslation = false;
    $scope.usernameSelected = false;
    $scope.stayAnon = false;
    $scope.anonUsername = 'anon' + Math.floor((Math.random()*90000)+10000); // generate random username for anons
    $rootScope.loading = true;

    roomSync.$loaded(function() {
      if ($rootScope.loggedIn === false && roomSync.noPassword === false) {
        $location.path($location.url() + '/login');
      }
      $scope.roomName = roomSync.roomName;
      $rootScope.loading = false;
    });

    chatRoom.authAnonymously(function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
      }
    });

    var key = 'trnsl.1.1.20150309T154331Z.204e43f2acbf0788.022db5406add6b3a68a6f48e8e956adcb8a0df24';

    // getLangs method for select elements
    $http.get('https://translate.yandex.net/api/v1.5/tr.json/getLangs?key=' + key + '&ui=en')
      .success(function(data) {
        $scope.langs = data.langs;
        $scope.selectedNativeLang = 'en';
        $scope.selectedTranslateLang = 'fr';
      })
      .error(function(status) {
        console.log(status);
      });

    $scope.submit = function(e) {

      if ($scope.noTranslation) {
        $scope.selectedTranslateLang = $scope.selectedNativeLang; // no translation
      }

      // translate method
      $http.get('https://translate.yandex.net/api/v1.5/tr.json/translate?key=' + key + '&lang=' + $scope.selectedNativeLang + '-' + $scope.selectedTranslateLang + '&text=' + $scope.message)
        .success(function(data) {
          requestSuccess(data);
        })
        .error(function(status) {
          console.log(status);
        });
      function requestSuccess(data) {
        $scope.translatedMessage = data.text[0];

        if ($scope.stayAnon) {
          $scope.name = $scope.anonUsername;
        }
        var date = new Date(),
            hours = date.getHours(),
            mins = date.getMinutes(),
            secs = date.getSeconds();
        $scope.time = hours + ':' + mins + ':' + secs;
        $scope.chatMessages.$add({ // save info to database
          user: $scope.name,
          anon: $scope.stayAnon,
          bodyOriginal: $scope.message,
          bodyTranslated: $scope.translatedMessage,
          time: $scope.time,
          from: $scope.selectedNativeLang,
          to: $scope.selectedTranslateLang
        });
        $scope.usernameSelected = true;
        $scope.message = ''; // reset message input after submitted
      }
    
    }
  });