/* global template */

(function() {
  angular.module('todo-list')
  .directive('todoList', todoList);
  
  function todoList() {
    return {
      restrict:     'E', 
      controller:   'ListController', 
      controllerAs: 'listCtrl',
      template:     template, 
      scope:        {
        list: '='
      }
    };
  }
  
})();
