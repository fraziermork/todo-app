/* global __DEVONLY__ */

(function() {
  angular.module('background-screen')
    .controller('BackgroundScreenController', [
      '$log', 
      '$scope',
      'backgroundScreenManager',
      BackgroundScreenController
    ]);
  
  function BackgroundScreenController($log, $scope, backgroundScreenManager) {
    const vm                          = this;
    vm.backgroundScreenManager        = backgroundScreenManager;
    vm.initialize                     = initialize;
    vm.handleBackgroundScreenClick    = handleBackgroundScreenClick;
    vm.checkIfBackgroundScreenVisible = checkIfBackgroundScreenVisible;
    
    
    function initialize() {
      if (__DEVONLY__) $log.debug('BackgroundScreenController initialize');
    }
    
    function checkIfBackgroundScreenVisible() {
      if (__DEVONLY__) $log.debug(`BackgroundScreenController checkIfBackgroundScreenVisible, visible: ${vm.backgroundScreenManager.visible}`);
      return vm.backgroundScreenManager.visible;  
    }
    
    function handleBackgroundScreenClick() {
      if (__DEVONLY__) $log.debug('BackgroundScreenController handleBackgroundScreenClick');
      vm.backgroundScreenManager.callbackToRunOnClick();
      vm.backgroundScreenManager.hideBackgroundScreen();
    }
    
    
    
  }  
})();
