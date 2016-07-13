/* global __DEVONLY__ */ 

const assign = require('lodash.assign');

(function() {
  angular.module('todo-item')
  .controller('ItemController', ['$log', '$scope', 'itemManager', 'listManager', ItemController]);
  
  function ItemController($log, $scope, itemManager, listManager) {
    const vm                       = this;
    vm.item                        = $scope.item;
    vm.error                       = null;
    vm.listManager                 = listManager;    
    // Properties for edits
    vm.itemActionsHidden           = false;
    vm.itemEdits                   = {};
    // Attach methods
    vm.initialize                  = initialize;
    vm.toggleItemActionsVisibility = toggleItemActionsVisibility;
    
    
    
    
    /**    
     * initialize - runs on ititialization of the item
     *        
     */     
    function initialize() {
      if (__DEVONLY__) $log.debug(`ItemController initialize for ${vm.item.name}`);
      
      
    }
    
    
    
    
    /**    
     * showItemActions - toggles the visibility of itemActions controls
     *         
     */     
    function toggleItemActionsVisibility() {
      if (__DEVONLY__) $log.debug('ItemController toggleItemActionsVisibility');
      assign(vm.itemEdits, vm.item);
      vm.itemActionsHidden = !vm.itemActionsHidden;
    }
    
    
    
    
    
  }
  
  
})();
