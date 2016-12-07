/* global template */

angular.module('todo-edit-list-form')
  .directive('editListForm', editListForm);
  
function editListForm() {
  return {
    restrict:     'E', 
    controller:   'EditListFormController', 
    controllerAs: 'editListCtrl',
    template:     template,
  };
}    
