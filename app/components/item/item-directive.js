/* global template */

(function() {
  angular.module('todo-item')
  .directive('listItem', listItem);
  
  function listItem() {
    return {
      restrict:     'E', 
      controller:   'ItemController', 
      controllerAs: 'itemCtrl',
      template:     template, 
      scope:        {
        item: '='
      }
      
    };
  }
  
})();
