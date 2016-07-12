/* global __DEVONLY__ */ 

(function() {
  angular.module('todo-list')
  .controller('ListController', ['$log', '$scope', 'listManager', 'itemManager', ListController]);
  
  function ListController($log, $scope, listManager) {
    const vm      = this;
    vm.list       = $scope.list;
    
    
    // Attach methods
    vm.initialize = initialize;
    
    
    /**    
     * initialize - this makes the initial request to get all the items in a list to show 
     *          
     */     
    function initialize() {
      if (__DEVONLY__) $log.debug('ListController initialize');
      listManager.getItemsInList(vm.list)
        .then((items) => {
          if (__DEVONLY__) $log.debug(`SUCCESS in ListController initialize for ${vm.list.name}`);
        })
        .catch((err) => {
          if (__DEVONLY__) $log.error('ERROR in ListController initialize', err);
        });
    }
    
    
    
  }
  
  
})();
