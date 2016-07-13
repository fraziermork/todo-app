(function() {
  angular.module('todo-item-form')
    .controller('ItemFormController', [
      '$log', 
      'listManager',
      'itemManager', 
      ItemFormController
    ]);
    
  function ItemFormController() {
    const vm = this;
    vm.pending = false;
    
    
    
    
    
    
  } 
   
})();
