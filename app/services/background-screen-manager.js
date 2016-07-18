/* global __DEVONLY__ */

(function() {
  angular.module('todo-services')
    .factory('backgroundScreenManager', [
      '$log', 
      '$rootScope',
      returnBackgroundScreenManager
    ]);
  
  function returnBackgroundScreenManager($log, $rootScope) {
    const backgroundScreenManager = {
      visible:              false,
      callbackToRunOnClick: null,
      
      /**      
       * showBackgroundScreenUntilClickOrCondition - this shows the background screen to cover most content
       *                                           - if clicked, the screen will hide itself and run the callback
       *                                           - otherwise, the screen can be hidden with the hideBackgroundScreen method      
       *        
       * @param  {object}   scope                 the angular $scope object, used to make it possible to call $scope.$apply();             
       * @param  {function} callbackToRunOnClick  a function to run if the user clicks the background screen to exit the popup screen instead of submitting or exiting out of that form
       */       
      showBackgroundScreenUntilClickOrCondition(scope, callbackToRunOnClick) {
        if (__DEVONLY__) $log.debug('backgroundScreenManager showBackgroundScreenUntilClickOrCondition');
        // scope.$apply();
        $rootScope.$evalAsync(() => {
          backgroundScreenManager.visible              = true;
          backgroundScreenManager.callbackToRunOnClick = callbackToRunOnClick;
        });
      },
      
      
      
      
      /**      
       * hideBackgroundScreen - this hides the background screen, allowing the user to interact with content 
       *        
       * @param  {function} scope the angular $scope object, used to make it possible to call $scope.$apply();   
       */       
      hideBackgroundScreen(scope) {
        if (__DEVONLY__) $log.debug('backgroundScreenManager hideBackgroundScreen');
        $rootScope.$evalAsync(() => {
          backgroundScreenManager.visible              = false;
          backgroundScreenManager.callbackToRunOnClick = null;
        });
      }
    };
    return backgroundScreenManager;
  }  
    
})();    
