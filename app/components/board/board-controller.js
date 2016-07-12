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
    const vm = this;
    vm.error = null;
    vm.lists = listManager.lists;
    
    // attach methods
    vm.initialize = initialize;
    
    function initialize() {
      if (__DEVONLY__) $log.debug('BoardController initialize');
      rerouteCheck();
    }
    
  }

})();
