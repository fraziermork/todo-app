/* global template */

(function() {
  angular.module('background-screen')
    .directive('backgroundScreen', backgroundScreen);
  
  function backgroundScreen() {
    return {
      restrict:     'E', 
      controller:   'BackgroundScreenController', 
      controllerAs: 'screenCtrl',
      template:     template, 
    };
  }
  
})();
