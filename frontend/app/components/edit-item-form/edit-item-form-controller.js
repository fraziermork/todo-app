/* global __DEVONLY__ */ 

const assign = require('lodash.assign');

angular.module('todo-edit-item-form')
  .controller('EditItemFormController', [
    '$log',
    '$scope',
    'itemManager',
    'listManager',
    'editItemVis',
    EditItemFormController
  ]);

function EditItemFormController($log, $scope, itemManager, listManager, editItemVis) {
  const vm                      = this;
  vm.error                      = null;
  vm.itemEdits                  = {};
  
  // Attach services for close button method and ng repeat for optons 
  vm.editItemVis                = editItemVis;
  vm.listManager                = listManager;
  
  // Attach methods
  vm.initialize                 = initialize;
  vm.checkIfEditItemFormVisible = checkIfEditItemFormVisible;
  vm.saveChangesToItem          = saveChangesToItem;
  
  
  
  function initialize() {
    if (__DEVONLY__) $log.debug('EditItemFormController initialize');
    assign(vm.itemEdits, editItemVis.item);
    vm.itemEdits.listId = editItemVis.list._id;
    if (__DEVONLY__) $log.log('vm.itemEdits: \n', vm.itemEdits);
  }
  
  
  
  function checkIfEditItemFormVisible() {
    // if (__DEVONLY__) $log.debug('EditItemFormController checkIfEditItemFormVisible');
    return editItemVis.visible;
  }
  
  
  
  
  function saveChangesToItem() {
    if (__DEVONLY__) $log.debug('EditItemFormController saveChangesToItem');
    if (vm.pending) {
      if (__DEVONLY__) $log.warn('saveChangesToItem request is pending');
      return;
    }
    
    // TODO: figure out a better way to do this
    if (vm.itemEdits.name === editItemVis.name && vm.itemEdits.list === editItemVis.list && vm.itemEdits.content === editItemVis.content) {
      if (__DEVONLY__) $log.warn('saveChangesToItem, no changes to make');
      return;
    }
    
    let itemUpdateInfo = vm.itemEdits;
    if (__DEVONLY__) $log.log('saveChangesToItem itemUpdateInfo: ', itemUpdateInfo);
    
    itemManager.updateItem(editItemVis.item, editItemVis.list, itemUpdateInfo)
      .then((updatedItem) => {
        vm.itemEdits = {};
        // vm.itemEdits = assign({}, editItemVis.item); // complicated to implement because of possibility of changing the list the item belongs to, easier to autohide on submit 
        editItemVis.hideEditItemForm();
        // $scope.$apply();
      })
      .catch((err) => {
        if (__DEVONLY__) $log.error('EditItemFormController saveChangesToItem ERROR: ', err);
        vm.error = err;
      });
  }
  
}  
    
