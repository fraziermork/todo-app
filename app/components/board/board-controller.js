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
    
    function initialize() {
      // TODO: make compatible w/ page reload
      // store user as cookie/sessionstorage, then if they load it'll check reroute (ensuring logged in), if it is but no usermanager.user, then it loads it from wherever its stored
      // the ng-inits on all the list views will take care of loading all the lists 
      
      if (__DEVONLY__) $log.debug('BoardController initialize');
      userManager.rerouteCheck();
      userManager.fetchUserAndListDataFromCookieIfNecessary();
      vm.lists = listManager.lists;
    }
    
    
    
    
    
    
    
  }

})();
