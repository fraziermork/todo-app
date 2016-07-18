/* global template */

(function() {
  angular.module('todo-item')
    .directive('todoItem', todoItem);
  
  function todoItem() {
    return {
      restrict:     'E', 
      controller:   'ItemController', 
      controllerAs: 'itemCtrl',
      template:     template, 
      scope:        {
        item: '=',
      },
    };
  }
  
})();
