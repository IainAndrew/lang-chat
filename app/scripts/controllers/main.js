'use strict';

/**
 * @ngdoc function
 * @name langChatApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the App
 */
angular.module('App')
  .controller('MainCtrl', function ($scope, $firebaseArray, $http) {
    var ref = new Firebase('https://gptgzo9lwy0.firebaseio-demo.com/');
    $scope.messages = $firebaseArray(ref);
    $scope.usernameSelected = false;
    $scope.stayAnon = false;
    $scope.anonUsername = 'anon' + Math.floor((Math.random()*90000)+10000); // generate random username for anons

    var key = 'trnsl.1.1.20150309T154331Z.204e43f2acbf0788.022db5406add6b3a68a6f48e8e956adcb8a0df24';

    // getLangs method for select elements
    $http.get('https://translate.yandex.net/api/v1.5/tr.json/getLangs?key=' + key + '&ui=en')
      .success(function(data) {
        $scope.langs = data.langs;
        // $scope.langsAbbrev = Object.keys($scope.langs); // abbreviated language names
        // $scope.langVals = [];
        // for(var key in $scope.langs) {
        //   $scope.langVals.push($scope.langs[key]); // values without keys
        // }
        $scope.selectedNativeLang = 'en';
        $scope.selectedTranslateLang = 'fr';
      })
      .error(function(status) {
        console.log(status);
      });

    $scope.submit = function(e) {

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
        $scope.messages.$add({ // save info to database
          user: $scope.name,
          anon: $scope.stayAnon,
          bodyOriginal: $scope.message,
          bodyTranslated: $scope.translatedMessage,
          time: $scope.time,
          from: $scope.selectedNativeLang,
          to: $scope.selectedTranslateLang
        });
        $scope.usernameSelected = true;
        $scope.message = ""; // reset message input after submitted
      }

    
    }
  });
