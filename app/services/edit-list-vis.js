/* global __DEVONLY__ */

(function() {
  angular.module('todo-services')
    .factory('editListVis', [
      '$log', 
      '$rootScope', 
      'backgroundScreenVis',
      returnEditListVis
    ]);
  
  function returnEditListVis($log, $rootScope, backgroundScreenVis) {
    const editListVis = {
      visible: false,
      list:    null,
      
      
      
      /**      
       * showEditListForm - sets the form's visibility to true and sets the list to edit
       *        
       * @param  {object} list the list object to edit         
       */       
      showEditListForm(list) {
        if (__DEVONLY__) $log.debug('editItemVis showEditListForm');
        editListVis.list = list;
        $rootScope.$evalAsync(() => {
          editListVis.visible = true;
        });
        backgroundScreenVis.showBackgroundScreenUntilClickOrCondition(editListVis.hideEditListForm);
      }, 
      
      
      /**      
       * showEditListForm - sets the form's visibility to false
       *        
       * @param  {object} list the list object to edit         
       */ 
      hideEditListForm() {
        if (__DEVONLY__) $log.debug('editItemVis hideEditListForm');
        editListVis.list = null;
        $rootScope.$evalAsync(() => {
          editListVis.visible = false;
        });
        backgroundScreenVis.hideBackgroundScreen();
      },
      
    };
    
    
    return editListVis;
  } 
  
})();    
