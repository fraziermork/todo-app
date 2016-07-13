/* global __DEVONLY__ */ 
// TODO: write validators for name length 

(function() {
  angular.module('todo-item-form')
    .controller('ItemFormController', [
      '$log', 
      '$scope',
      'listManager',
      'itemManager', 
      ItemFormController
    ]);
    
  function ItemFormController($log, $scope, listManager, itemManager) {
    const vm               = this;
    vm.error               = null;
    vm.pending             = false;
    vm.list                = $scope.list;
    vm.toggleVisibility    = $scope.toggleVisibility;
    vm.newItem             = {};
    vm.newItem.name        = null;
    vm.newItem.content     = null;
    
    // Attach methods
    vm.createItem             = createItem;
    vm.hideFormAndClearInputs = hideFormAndClearInputs;
    vm.resetForm              = resetForm;
    
    
    
    
    /**    
     * createItem - posts the item made with the form to the database    
     *        
     */     
    function createItem() {
      if (__DEVONLY__) $log.debug('ItemFormController createItem');
      if (vm.pending) {
        return;
      }
      
      itemManager.postNewItem(vm.newItem, vm.list)
        .then((item) => {
          if (__DEVONLY__) $log.debug('createItem: SUCCESS');
          vm.resetForm();
          vm.toggleVisibility();
        })
        .catch((err) => {
          if (__DEVONLY__) $log.error('createItem: ', err);
          vm.error = err;
        });
    }
    
    
    
    /**    
     * resetForm - resets the values of the item being created
     *       
     */     
    function resetForm() {
      if (__DEVONLY__) $log.debug('ItemFormController resetForm');
      vm.newItem = {
        name:    null,
        content: null,
      };
      vm.pending = false;
    }
    
    
    
    /**    
     * hideFormAndClearInputs - runs when the close button is clicked
     *      
     */     
    function hideFormAndClearInputs() {
      if (__DEVONLY__) $log.debug('ItemFormController hideFormAndClearInputs');
      vm.resetForm();
      vm.toggleVisibility();
    }
    
  } 
   
})();
