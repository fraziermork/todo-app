/* global __DEVONLY__ */ 

const assign = require('lodash.assign');

(function() {
  angular.module('todo-item')
  .controller('ItemController', ['$log', '$scope', 'itemManager', 'listManager', ItemController]);
  
  function ItemController($log, $scope, itemManager, listManager) {
    const vm           = this;
    vm.item            = $scope.item;
    vm.error           = null;
    vm.listManager     = listManager;
    
    // Properties for edits
    vm.editable        = false;
    vm.itemEdits       = {};
    
    // Attach methods
    vm.initialize      = initialize;
    vm.showItemActions = showItemActions;
    
    
    
    
    /**    
     * initialize - runs on ititialization of 
     *      
     * @return {type}  description     
     */     
    function initialize() {
      if (__DEVONLY__) $log.debug(`ItemController initialize for ${vm.item.name}`);
      
      
    }
    
    
    
    
    /**    
     * showItemActions - toggles the visibility of itemActions controls
     *         
     */     
    function showItemActions() {
      if (__DEVONLY__) $log.debug('ItemController showItemActions');
      assign(vm.itemEdits, vm.item);
      vm.editable = !vm.editable;
    }
    
    
    
  }
  
  
})();
