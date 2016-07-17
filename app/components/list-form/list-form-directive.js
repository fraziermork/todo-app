/* global template */

(function() {
  angular.module('todo-list-form')
    .directive('listForm', listForm);
  
  function listForm() {
    return {
      restrict:     'E', 
      controller:   'ListFormController', 
      controllerAs: 'listFormCtrl',
      template:     template,
      scope:        {
        toggleVisibility: '&',
      },
    };
  }
  
})();
