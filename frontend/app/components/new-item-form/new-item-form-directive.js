/* global template */

angular.module('todo-new-item-form')
  .directive('newItemForm', newItemForm);

function newItemForm() {
  return {
    restrict:     'E', 
    controller:   'NewItemFormController', 
    controllerAs: 'newItemCtrl',
    template:     template, 
    scope:        {
      list:             '=',
      toggleVisibility: '&',
    },
  };
} 
  
