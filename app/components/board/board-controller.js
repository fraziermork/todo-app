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
      BoardController
    ]);

  function BoardController($log, $scope, apiRequest, rerouteCheck, listManager, itemManager) {
    const vm = this;
    
    
    
    
    vm.initialize = initialize;
    
    function initialize() {
      if (__DEVONLY__) $log.debug('BoardController initialize');
      rerouteCheck();
      
    }
    
    
  }

})();
