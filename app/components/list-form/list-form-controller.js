/* global __DEVONLY__ */

(function() {
  angular.module('todo-list-form')
    .controller('ListFormController', [
      '$log', 
      '$scope',
      'listManager', 
      ListFormController
    ]);
  
  function ListFormController($log, $scope, listManager) {
    const vm                  = this;
    vm.pending                = false;
    vm.error                  = null;
    vm.visible                = false;
    vm.newList                = {};
    vm.newList.name           = null;
    vm.newList.description    = null;
    vm.newList.items          = [];
    
    vm.createList             = createList;
    vm.resetForm              = resetForm;
    vm.toggleVisibility       = $scope.toggleVisibility;
    vm.hideFormAndClearInputs = hideFormAndClearInputs;
    
    function createList() {
      if (__DEVONLY__) $log.debug('ListFormController createList');
      if (vm.pending) {
        return;
      }
      vm.pending = true;
      let infoAboutListToPost = vm.newList;
      vm.resetForm();
      vm.toggleVisibility();
      listManager.postNewList(infoAboutListToPost)
        .then((list) => {
          if (__DEVONLY__) $log.debug(`SUCCESS in ListFormController createList for ${list.name}`);
          $scope.$apply();
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
      vm.newList.items       = [];
      vm.pending             = false;
    }
    
    function hideFormAndClearInputs() {
      if (__DEVONLY__) $log.debug('ListFormController hideFormAndClearInputs');
      if (!vm.pending) {
        vm.resetForm();
        vm.toggleVisibility();
      }
    }
    
  }
  
})();
