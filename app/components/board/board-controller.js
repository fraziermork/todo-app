/* global __DEVONLY__ */

// const defaults = require('lodash.defaults');

(function() {
  angular.module('todo-board')
    .controller('BoardController', [
      '$log', 
      '$scope', 
      'apiRequest', 
      'listManager', 
      'itemManager', 
      'userManager',
      BoardController
    ]);

  function BoardController($log, $scope, apiRequest, listManager, itemManager, userManager) {
    const vm            = this;
    vm.error            = null;
    vm.lists            = [];
    
    // attach methods
    vm.initialize       = initialize;
    
    
    
    
    /**    
     * initialize - checks if they are authenticated and sets data on services from persistence if needed
     *      
     */     
    function initialize() {
      if (__DEVONLY__) $log.debug('BoardController initialize');
      userManager.rerouteCheck();
      userManager.fetchUserAndListDataFromCookieIfNecessary();
      vm.lists = listManager.lists;
    }
    
    
    
    
    
    
    
  }

})();
