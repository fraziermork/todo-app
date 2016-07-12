/* global __DEVONLY__ */
// TODO: figure out what to do with errors


// const defaults = require('lodash.defaults');
const assign = require('lodash.assign');

(function() {
  angular.module('todo-services')
    .factory('listManager', [
      '$log', 
      'apiRequest', 
      returnListManager
    ]);
    
  function returnListManager($log, apiRequest) {
    let listManager = {
      lists: [],
      
      /**      
       * getItemsInList - helper method to retrieve all the items in a list and store them on the list upon successful retrieval 
       *        
       * @param  {object}   originalListObj the original list object to retrieve the items for, and store the items on upon success       
       * @return {promise}                  a promise that resolves with the items or rejects if there was an error in the request     
       */       
      getItemsInList(originalListObj) {
        if (__DEVONLY__) $log.debug('listManager getItemsInList');
        return apiRequest('get', `lists/${originalListObj._id}/items`)
          .then((items) => {
            if (__DEVONLY__) $log.debug(`SUCCESS in listManager getItemsInList for ${originalListObj.name}`);
            if (__DEVONLY__) $log.log(items);
            originalListObj.items = items;
            return originalListObj;
          });
      },
      
      
      
      
      /**      
       * postNewList  - a helper method to post a new method 
       *              - constructs a placeholder list object in memory, posts it to the database, then updates the local one in memory upon success
       *        
       * @param     {object} listInfo       an object describing the new list
       * @property  {string} name           the name of the list 
       * @property  {string} description    a description of the list      
       * @return    {promise}               a promise that resolves with the updated list or rejects with a server error       
       */       
      postNewList(listInfo) {
        if (__DEVONLY__) $log.debug('listManager postNewList');
        listInfo._id = 'placeholderId';
        this.lists.push(listInfo);
        return apiRequest('post', 'lists', listInfo)
          .then((list) => {
            if (__DEVONLY__) $log.debug('SUCCESSS in listManager postNewList');
            assign(listInfo, list);
            $log.info('AFTER POST LIST ASSIGN');
            $log.log(listInfo);
            return listInfo;
          });
      },
      
      
      
      /**      
       * updateList - a helper method to update a list      
       *        
       * @param  {object}   originalListObj the list object       
       * @param  {object}   updates         an object describing the updates to make to the list       
       * @return {promise}                  a promise that resolves with the updated list object or rejects with a server error
       */       
      updateList(originalListObj, updates) {
        if (__DEVONLY__) $log.debug('listManager updateList');
        return new Promise((resolve, reject) => {
          
          
        });
      },
      
      
      
      /**      
       * deleteList - a helper method to delete lists
       *        
       * @param  {type} originalListObj description       
       * @return {type}                 description       
       */       
      deleteList(originalListObj) {
        if (__DEVONLY__) $log.debug('listManager deleteList');
        return new Promise((resolve, reject) => {
          
          
        });
      },
      
      
      
      /**      
       * moveItemFromListToList - description      
       *        
       * @param  {type} item            description       
       * @param  {type} sourceList      description       
       * @param  {type} destinationList description       
       * @return {type}                 description       
       */       
      moveItemFromListToList(item, sourceList, destinationList) {
        if (__DEVONLY__) $log.debug('listManager moveItemFromListToList');
        
        
      }, 
      
      
      changeItemIndexInList(list, item, newIndex) {
        if (__DEVONLY__) $log.debug('listManager moveItemFromListToList');
        
        
      }
       
    };
    return listManager;
  }
    
})();
