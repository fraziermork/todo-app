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
    vm.showNewListForm  = showNewListForm;
    
    
    
    
    
    function goBackToAllLists() {
      if (__DEVONLY__) $log.debug('NavbarController goBackToAllLists');
      listManager.currentList = null;
    }
    
    
    
    
    function showNewListForm() {
      if (__DEVONLY__) $log.debug('NavbarController showNewListForm');
      vm.goBackToAllLists();
      vm.toggleVisibility();
    }
    
    
  }
  
})();
