/* global __DEVONLY__ */

// const defaults = require('lodash.defaults');

(function() {
  angular.module('todo-board')
    .controller('BoardController', [
      '$log', 
      '$scope', 
      'apiRequest', 
      'rerouteCheck', 
      'listManager', 
      'itemManager', 
      'userManager',
      BoardController
    ]);

  function BoardController($log, $scope, apiRequest, rerouteCheck, listManager, itemManager, userManager) {
    const vm            = this;
    vm.error            = null;
    vm.lists            = listManager.lists;
    
    // attach methods
    vm.initialize       = initialize;
    vm.handlePageReload = handlePageReload;
    
    
    function initialize() {
      // TODO: make compatible w/ page reload
      // store user as cookie/sessionstorage, then if they load it'll check reroute (ensuring logged in), if it is but no usermanager.user, then it loads it from wherever its stored
      // the ng-inits on all the list views will take care of loading all the lists 
      
      if (__DEVONLY__) $log.debug('BoardController initialize');
      rerouteCheck();
      // vm.handlePageReload();
    }
    
    
    
    
    
    /**    
     * handlePageReload - purpose of this is to check if there is a user in storage somewhere, if there is, set that as usermanager.user so that user data persists beyond a page load
     *      
     * @return {type}  description     
     */     
    function handlePageReload() {
      
      
      
      
    }
    
  }

})();
