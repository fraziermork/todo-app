/* global __DEVONLY__ */ 

(function() {
  angular.module('todo-list')
  .controller('ListController', ['$log', '$scope', ListController]);
  
  function ListController($log, $scope) {
    const vm      = this;
    vm.initialize = initialize;
    
    
    function initialize() {
      if (__DEVONLY__) $log.debug('ListController initialize');
      
    }
    
    
    
  }
  
  
})();
