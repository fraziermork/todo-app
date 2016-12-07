/* global template */

angular.module('todo-background-screen')
  .directive('backgroundScreen', backgroundScreen);

function backgroundScreen() {
  return {
    restrict:     'E', 
    controller:   'BackgroundScreenController', 
    controllerAs: 'screenCtrl',
    template:     template, 
  };
}
  
