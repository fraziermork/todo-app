/* global __DEVONLY__ */
// TODO: figure out what to do with errors

const assign = require('lodash.assign');

angular.module('todo-services')
  .factory('listManager', [
    '$log', 
    '$window',
    'apiRequest', 
    returnListManager,
  ]);
  
function returnListManager($log, $window, apiRequest) {
  const listManager = {
    lists:       [],
    currentList: null,
    
    
    /**      
     * getAllLists - Gets all lists from database 
     *        
     * @return {promise}  a promise that resolves with all lists or rejects if there was an error in the request        
     */       
    getAllLists() {
      if (__DEVONLY__) $log.debug('listManager getAllLists');
      return apiRequest('get', 'lists')
        .then((lists) => {
          if (__DEVONLY__) $log.log('SUCCESS in listManager getAllLists', lists);
          this.lists = lists;
          return lists;
        });
    }, 
    
    
    /**      
     * getItemsInList - helper method to retrieve all the items in a list and store them on the list upon successful retrieval 
     *        
     * @param  {object}   originalListObj the original list object to retrieve the items for, and store the items on upon success       
     * @return {promise}                  a promise that resolves with the items or rejects if there was an error in the request     
     */       
    getItemsInList(originalListObj) {
      // if (__DEVONLY__) $log.debug('listManager getItemsInList');
      return apiRequest('get', `lists/${originalListObj._id}/items`)
        .then((items) => {
          // if (__DEVONLY__) $log.log(`SUCCESS in listManager getItemsInList for ${originalListObj.name}`);
          // if (__DEVONLY__) $log.log(items);
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
          assign(listInfo, list);
          // if (__DEVONLY__) $log.log(`postNewList: SUCCESS  for ${listInfo.name}`, listInfo);
          
          // Update lists in storage and return listInfo into next .then in chain 
          // It doesnt matter that this list has items in it and the ones from login dont--lists always grab all their items on init anyway
          $window.sessionStorage.setItem('todo-user-lists', angular.toJson(listManager.lists));
          listManager.currentList = listInfo._id;
          return listInfo;
        });
    },
    
    
    /**      
     * updateList - a helper method to update a list      
     *        
     * @param  {object}   list            the list to be updated       
     * @param  {object}   [listUpdateInfo]  an object describing the updates to make to the list, defaults to just updating the existing list object       
     * @return {promise}                  a promise that resolves with the updated list object or rejects with a server error
     */       
    updateList(list, listUpdateInfo) {
      if (__DEVONLY__) $log.debug(`listManager updateList for ${list.name}`);
      
      return apiRequest('put', `lists/${list._id}`, { data: listUpdateInfo || list })
        .then((updatedList) => {
          // if (__DEVONLY__) $log.log('listManager updateList SUCCESS', updatedList);
          assign(list, updatedList);
          // if (__DEVONLY__) $log.log('listManager updateList AFTER ASSIGN: ', list);
          return list;
        });
    },
    
    
    /**      
     * deleteList - a helper method to delete lists
     *            - TODO: if the list's id is the same as currentList, set currentList to null
     *        
     * @param  {type} listToDelete description       
     * @return {type}              description       
     */       
    deleteList(listToDelete) {
      if (__DEVONLY__) $log.debug('listManager deleteList');
      return apiRequest('delete', `lists/${listToDelete._id}`)
        .then(() => {
          listManager.lists = listManager.lists.filter((list) => {
            return list._id !== listToDelete._id;
          });
        });
    },
    
    
    /**       
     * setCurrentList - sets the value of listManager.currentList to the id of the input list
     *        
     * @param  {object} list  the list that should be set to the current one        
     * @return {type}         description       
     */       
    setCurrentList(list) {
      if (__DEVONLY__) $log.debug(`listManager setCurrentList to ${list.name}`);
      listManager.currentList = list._id;
    },
    
    
  };
  return listManager;
}
    
