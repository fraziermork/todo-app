/* global __DEVONLY__ */ 
// TODO: write validators for name length 

(function() {
  angular.module('todo-new-item-form')
    .controller('NewItemFormController', [
      '$log', 
      '$scope',
      'listManager',
      'itemManager', 
      NewItemFormController
    ]);
    
  function NewItemFormController($log, $scope, listManager, itemManager) {
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
      if (__DEVONLY__) $log.debug('NewItemFormController createItem');
      if (vm.pending) {
        if (__DEVONLY__) $log.warn('createItem pending, exiting ');
        return;
      }
      let infoAboutItemToPost = vm.newItem;
      vm.hideFormAndClearInputs();
      
      itemManager.postNewItem(infoAboutItemToPost, vm.list)
        .then((item) => {
          vm.resetForm();
          // $scope.$apply();
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
      if (__DEVONLY__) $log.debug('NewItemFormController resetForm');
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
      if (__DEVONLY__) $log.debug('NewItemFormController hideFormAndClearInputs');
      vm.resetForm();
      vm.toggleVisibility();
    }
    
  } 
   
})();
