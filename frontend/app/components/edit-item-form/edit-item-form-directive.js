/* global template */

angular.module('todo-edit-item-form')
  .directive('editItemForm', editItemForm);
  
function editItemForm() {
  return {
    restrict:     'E', 
    controller:   'EditItemFormController', 
    controllerAs: 'editItemCtrl',
    template:     template,
  };
} 
   
