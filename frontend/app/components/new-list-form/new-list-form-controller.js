/* global __DEVONLY__ */

angular.module('todo-new-list-form')
  .controller('NewListFormController', [
    '$log', 
    '$scope',
    'listManager', 
    NewListFormController
  ]);

function NewListFormController($log, $scope, listManager) {
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
    if (__DEVONLY__) $log.debug('NewListFormController createList');
    if (vm.pending) {
      return;
    }
    vm.pending = true;
    let infoAboutListToPost = vm.newList;
    vm.resetForm();
    vm.toggleVisibility();
    listManager.postNewList(infoAboutListToPost)
      .then((list) => {
        // if (__DEVONLY__) $log.log(`SUCCESS in NewListFormController createList for ${list.name}`);
        // $scope.$apply();
      })
      .catch((err) => {
        if (__DEVONLY__) $log.error('ERROR in NewListFormController createList', err);
        vm.error = `There was an error saving the list ${vm.newList.name} to the server.`;
      });
  }
  
  function resetForm() {
    if (__DEVONLY__) $log.debug('NewListFormController resetForm');
    vm.newList             = {};
    vm.newList.name        = null;
    vm.newList.description = null;
    vm.newList.items       = [];
    vm.pending             = false;
  }
  
  function hideFormAndClearInputs() {
    if (__DEVONLY__) $log.debug('NewListFormController hideFormAndClearInputs');
    if (!vm.pending) {
      vm.resetForm();
      vm.toggleVisibility();
    }
  }
  
}
