/* global __DEVONLY__ */ 

const assign = require('lodash.assign');

(function() {
  angular.module('todo-item')
  .controller('ItemController', [
    '$log', 
    '$scope', 
    'itemManager', 
    'listManager', 
    'editItemVis',
    ItemController
  ]);
  
  function ItemController($log, $scope, itemManager, listManager, editItemVis) {
    const vm                       = this;
    vm.item                        = $scope.item;
    vm.list                        = $scope.list;
    vm.error                       = null;
    vm.pending                     = true;
    vm.listManager                 = listManager;    
    
    // Properties for edits
    vm.itemActionsHidden           = true;
    vm.itemEdits                   = {};
    
    // Attach methods
    vm.initialize                  = initialize;
    vm.showEditItemForm            = showEditItemForm;
    
    
    
    /**    
     * initialize - runs on ititialization of the item
     *        
     */     
    function initialize() {
      // if (__DEVONLY__) $log.debug(`ItemController initialize for ${vm.item.name}`);
      assign(vm.itemEdits, vm.item);
      vm.pending = false;
    }
    
    
    
    
    /**    
     * showItemActions - toggles the visibility of itemActions controls
     *         
     */     
    function showEditItemForm() {
      if (__DEVONLY__) $log.debug('ItemController toggleItemActionsVisibility');
      editItemVis.showEditItemForm(vm.item, vm.list);
    }
    
    
    
      
  }
  
})();
