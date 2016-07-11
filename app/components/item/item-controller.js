/* global __DEVONLY__ */ 

(function() {
  angular.module('todo-item')
  .controller('ItemController', ['$log', '$scope', ItemController]);
  
  function ItemController($log, $scope) {
    const vm      = this;
    vm.initialize = initialize;
    
    
    function initialize() {
      if (__DEVONLY__) $log.debug('ItemController initialize');
      
    }
    
    
    
  }
  
  
})();
