/* global __DEVONLY__ */

(function() {
  angular.module('todo-navbar')
    .controller('NavbarController', [
      '$log', 
      '$scope',
      'listManager',
      'userManager', 
      NavbarController
    ]);
  
  function NavbarController($log, $scope, listManager, userManager) {
    const vm            = this;
    vm.toggleVisibility = $scope.toggleVisibility;
    vm.logout           = userManager.logout;
    vm.goBackToAllLists = goBackToAllLists;
    
    
    
    function goBackToAllLists() {
      if (__DEVONLY__) $log.debug('NavbarController goBackToAllLists');
      listManager.currentList = null;
    }
    
  }
  
})();
