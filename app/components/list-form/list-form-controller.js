/* global __DEVONLY__ */

(function() {
  angular.module('todo-list-form')
    .controller('ListFormController', [
      '$log', 
      'listManager', 
      ListFormController
    ]);
  
  function ListFormController($log, listManager) {
    const vm                  = this;
    vm.pending                = false;
    vm.error                  = null;
    vm.visible                = false;
    vm.newList                = {};
    vm.newList.name           = null;
    vm.newList.description    = null;
    
    vm.createList             = createList;
    vm.resetForm              = resetForm;
    vm.toggleVisibility       = toggleVisibility;
    vm.hideFormAndClearInputs = hideFormAndClearInputs;
    
    function createList() {
      if (__DEVONLY__) $log.debug('ListFormController createList');
      if (vm.pending) {
        return;
      }
      vm.pending = true;
      listManager.postNewList(vm.newList)
        .then(() => {
          if (__DEVONLY__) $log.debug('SUCCESS in ListFormController createList');
          vm.resetForm();
        })
        .catch((err) => {
          if (__DEVONLY__) $log.debug('ERROR in ListFormController createList', err);
          vm.error = `There was an error saving the list ${vm.newList.name} to the server.`;
        });
    }
    
    function resetForm() {
      if (__DEVONLY__) $log.debug('ListFormController resetForm');
      vm.newList             = {};
      vm.newList.name        = null;
      vm.newList.description = null;
      vm.pending             = false;
    }
    
    function toggleVisibility() {
      if (__DEVONLY__) $log.debug('ListFormController toggleVisibility');
      vm.visible = !vm.visible;
    }
    
    function hideFormAndClearInputs() {
      if (__DEVONLY__) $log.debug('ListFormController hideFormAndClearInputs');
      if (!vm.pending) {
        vm.visible = false;
        vm.resetForm();
      }
    }
    
  }
  
})();
