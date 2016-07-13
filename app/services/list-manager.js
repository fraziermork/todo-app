/* global __DEVONLY__ */
// TODO: figure out what to do with errors


// const defaults = require('lodash.defaults');
const assign = require('lodash.assign');

(function() {
  angular.module('todo-services')
    .factory('listManager', [
      '$log', 
      '$cookies',
      'apiRequest', 
      returnListManager
    ]);
    
  function returnListManager($log, $cookies, apiRequest) {
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
        
        // Add the temporary list object into the lists array
        listManager.lists.push(listInfo);
        
        // Return the request
        return apiRequest('post', 'lists', { data: listInfo })
          .then((list) => {
            if (__DEVONLY__) $log.debug(`postNewList: SUCCESSS  for ${listInfo.name}`);
            assign(listInfo, list);
            
            // Update lists in cookie and return listInfo into next .then in chain 
            // It doesnt matter that this list has items in it and the ones from login dont--lists always grab all their items on init anyway
            $cookies.putObject('todo-user-lists', listManager.lists);
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
