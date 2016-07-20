/* global __DEVONLY__ */

(function() {
  angular.module('todo-background-screen')
    .controller('BackgroundScreenController', [
      '$log', 
      '$scope',
      'backgroundScreenVis',
      BackgroundScreenController
    ]);
  
  function BackgroundScreenController($log, $scope, backgroundScreenVis) {
    const vm                          = this;
    vm.backgroundScreenVis        = backgroundScreenVis;
    vm.initialize                     = initialize;
    vm.handleBackgroundScreenClick    = handleBackgroundScreenClick;
    vm.checkIfBackgroundScreenVisible = checkIfBackgroundScreenVisible;
    
    
    function initialize() {
      if (__DEVONLY__) $log.debug('BackgroundScreenController initialize');
    }
    
    function checkIfBackgroundScreenVisible() {
      // if (__DEVONLY__) $log.debug(`BackgroundScreenController checkIfBackgroundScreenVisible, visible: ${vm.backgroundScreenVis.visible}`);
      return vm.backgroundScreenVis.visible;  
    }
    
    function handleBackgroundScreenClick() {
      if (__DEVONLY__) $log.debug('BackgroundScreenController handleBackgroundScreenClick');
      vm.backgroundScreenVis.callbackToRunOnClick();
      vm.backgroundScreenVis.hideBackgroundScreen();
    }
    
    
    
  }  
})();
