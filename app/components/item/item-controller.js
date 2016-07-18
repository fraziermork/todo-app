/* global __DEVONLY__ */ 

const assign = require('lodash.assign');

(function() {
  angular.module('todo-item')
  .controller('ItemController', [
    '$log', 
    '$scope', 
    'itemManager', 
    'listManager', 
    'backgroundScreenManager',
    ItemController
  ]);
  
  function ItemController($log, $scope, itemManager, listManager, backgroundScreenManager) {
    const vm                       = this;
    vm.item                        = $scope.item;
    vm.error                       = null;
    vm.pending                     = true;
    vm.listManager                 = listManager;    
    
    // Properties for edits
    vm.itemActionsHidden           = true;
    vm.itemEdits                   = {};
    
    // Attach methods
    vm.initialize                  = initialize;
    vm.toggleItemActionsVisibility = toggleItemActionsVisibility;
    vm.saveChangesToItem           = saveChangesToItem;
    
    
    
    /**    
     * initialize - runs on ititialization of the item
     *        
     */     
    function initialize() {
      if (__DEVONLY__) $log.debug(`ItemController initialize for ${vm.item.name}`);
      assign(vm.itemEdits, vm.item);
      vm.pending = false;
    }
    
    
    
    
    /**    
     * showItemActions - toggles the visibility of itemActions controls
     *         
     */     
    function toggleItemActionsVisibility() {
      if (__DEVONLY__) $log.debug('ItemController toggleItemActionsVisibility');
      vm.itemActionsHidden = !vm.itemActionsHidden;
      
      // If item actions are being hidden, also hide the background screen 
      if (vm.itemActionsHidden) {
        backgroundScreenManager.hideBackgroundScreen($scope);
        
      // If item actions are being shown, also show the background screen  
      } else {
        backgroundScreenManager.showBackgroundScreenUntilClickOrCondition($scope, () => {
          vm.itemActionsHidden = false;
        });
      }
    }
    
    function saveChangesToItem() {
      if (__DEVONLY__) $log.debug('ItemController saveChangesToItem');
      if (vm.pending) {
        if (__DEVONLY__) $log.warn('saveChangesToItem request is pending');
        return;
      }
      // TODO: figure out a better way to do this
      if (vm.itemEdits.name === vm.item.name && vm.itemEdits.list === vm.item.list && vm.itemEdits.content === vm.item.content) {
        if (__DEVONLY__) $log.warn('saveChangesToItem, no changes to make');
        return;
      }
      let itemUpdateInfo = vm.itemEdits;
      if (__DEVONLY__) $log.log('saveChangesToItem itemUpdateInfo: ', itemUpdateInfo);
      
      itemManager.updateItem(itemUpdateInfo, vm.item)
        .then((updatedItem) => {
          vm.itemEdits = assign({}, vm.item);
          vm.toggleItemActionsVisibility();
          $scope.$apply();
        })
        .catch((err) => {
          if (__DEVONLY__) $log.error('ItemController saveChangesToItem ERROR: ', err);
          vm.error = err;
        });
    }
    
      
  }
  
})();
