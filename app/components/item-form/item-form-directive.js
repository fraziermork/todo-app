/* global template */

(function() {
  angular.module('todo-item-form')
    .directive('itemForm', itemForm);
  
  function itemForm() {
    return {
      restrict:     'E', 
      controller:   'ItemFormController', 
      controllerAs: 'itemFormCtrl',
      template:     template, 
      scope:        {
        list:             '=',
        toggleVisibility: '&',
      },
    };
  } 
  
})(); 
