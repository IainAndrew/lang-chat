'use strict';

angular.module('app.directives.spinner', [])
  .directive('spinner', function() {
    return {
      restrict: 'E',
      templateUrl:'views/directives/spinner.html'
    };
  });