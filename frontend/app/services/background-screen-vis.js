/* global __DEVONLY__ */

(function() {
  angular.module('todo-services')
    .factory('backgroundScreenVis', [
      '$log', 
      '$rootScope',
      returnBackgroundScreenVis
    ]);
  
  function returnBackgroundScreenVis($log, $rootScope) {
    const backgroundScreenVis = {
      visible:              false,
      callbackToRunOnClick: null,
      
      /**      
       * showBackgroundScreenUntilClickOrCondition - this shows the background screen to cover most content
       *                                           - if clicked, the screen will hide itself and run the callback
       *                                           - otherwise, the screen can be hidden with the hideBackgroundScreen method      
       *                   
       * @param  {function} callbackToRunOnClick  a function to run if the user clicks the background screen to exit the popup screen instead of submitting or exiting out of that form
       */       
      showBackgroundScreenUntilClickOrCondition(callbackToRunOnClick) {
        if (__DEVONLY__) $log.debug('backgroundScreenVis showBackgroundScreenUntilClickOrCondition');
        backgroundScreenVis.callbackToRunOnClick = callbackToRunOnClick;
        $rootScope.$evalAsync(() => {
          backgroundScreenVis.visible            = true;
        });
      },
      
      /**      
       * hideBackgroundScreen - this hides the background screen, allowing the user to interact with content 
       *        
       */       
      hideBackgroundScreen() {
        if (__DEVONLY__) $log.debug('backgroundScreenVis hideBackgroundScreen');
        backgroundScreenVis.callbackToRunOnClick = null;
        $rootScope.$evalAsync(() => {
          backgroundScreenVis.visible            = false;
        });
      }
      
      
      
    };
    
    
    return backgroundScreenVis;
  }  
    
})();    
