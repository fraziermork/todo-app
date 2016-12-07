/* global template */

angular.module('todo-new-list-form')
  .directive('newListForm', newListForm);

function newListForm() {
  return {
    restrict:     'E', 
    controller:   'NewListFormController', 
    controllerAs: 'newListCtrl',
    template:     template,
    scope:        {
      toggleVisibility: '&',
    },
  };
}
