/* global __DEVONLY__ */ 

const assign = require('lodash.assign');

(function() {
  angular.module('todo-edit-list-form')
    .controller('EditListFormController', [
      '$log',
      '$scope',
      'listManager',
      'editListVis',
      EditListFormController
    ]);
  
  function EditListFormController($log, $scope, listManager, editListVis) {
    const vm                      = this;
    vm.error                      = null;
    vm.listEdits                  = {};
    
    // Attach services for close button method and ng repeat for optons 
    vm.editListVis                = editListVis;
    vm.listManager                = listManager;
    
    // Attach methods
    vm.initialize                 = initialize;
    vm.checkIfEditListFormVisible = checkIfEditListFormVisible;
    vm.saveChangesToList          = saveChangesToList;
    
    
    
    function initialize() {
      if (__DEVONLY__) $log.debug('EditListFormController initialize');
      assign(vm.listEdits, editListVis.list);
    }
    
    
    
    function checkIfEditListFormVisible() {
      // if (__DEVONLY__) $log.debug('EditListFormController checkIfEditListFormVisible');
      return editListVis.visible;
    }
    
    
    
    
    function saveChangesToList() {
      if (__DEVONLY__) $log.debug('EditListFormController saveChangesToList');
      if (vm.pending) {
        if (__DEVONLY__) $log.warn('saveChangesToList request is pending');
        return;
      }
      
      // TODO: figure out a better way to do this
      if (vm.listEdits.name === editListVis.name && vm.listEdits.description === editListVis.description) {
        if (__DEVONLY__) $log.warn('saveChangesToList, no changes to make');
        return;
      }
      
      let listUpdateInfo = vm.listEdits;
      // if (__DEVONLY__) $log.log('saveChangesToList listUpdateInfo: ', listUpdateInfo);
      
      listManager.updateList(listUpdateInfo, editListVis.list)
        .then((updatedList) => {
          vm.listEdits = assign({}, editListVis.list);
          editListVis.hideEditListForm();
          // $scope.$apply();
        })
        .catch((err) => {
          if (__DEVONLY__) $log.error('EditListFormController saveChangesToList ERROR: ', err);
          vm.error = err;
        });
    }
    
  }  
    
})();
