/* eslint-env jasmine */
/* global inject */

const assign = require('lodash.assign'); 

describe('itemManager', function() {
  beforeEach(function() {
    angular.mock.module('todo-services');
  });
  
  beforeEach(inject(function($injector) {
    this.$injector    = $injector;
    this.$q           = $injector.get('$q');
    this.$httpBackend = $injector.get('$httpBackend');
    this.listManager  = $injector.get('listManager');
    this.itemManager  = $injector.get('itemManager');
  }));
  
  afterEach(function() {
    // Without false passed in as an argument, both of these call $rootScope.$digest
    // this.$httpBackend.flush already calls $rootScope.$digest 
    // This doesn't work well with calling done, because that triggers the verify functions before the $digest is finished 
    // Might be able to rig this up with a timeout too 
    // Not sure if this prevents any checks from happenning 
    this.$httpBackend.verifyNoOutstandingExpectation(false);
    this.$httpBackend.verifyNoOutstandingRequest(false);
  });
  
  describe('postNewItem', function() {
    it('should let you post a new item', function(done) {
      const parentList = {
        _id:   'fubar',
        items: [],
      };
      
      const newItem = {
        hello: 'world',
      };
      
      const dummyServerResponse = assign({}, newItem, {
        _id: 'helloWorld',
      });
      
      this.$httpBackend
        .expect('POST', `${__API_URL__}/lists/${parentList._id}/items`)
        .respond(dummyServerResponse);
      
      this.itemManager.postNewItem(newItem, parentList)
        .then((item) => {
          expect(item).toBe(newItem);
          expect(item._id).toEqual(dummyServerResponse._id);
          done();
        })
        .catch(done.fail);
      
      expect(parentList.items).toContain(newItem);
      
      this.$httpBackend.flush();
    });
  });
  
  describe('updateItem', function() {
    it('should let you update an item', function(done) {
      const parentList = {
        _id:   'fubar',
        items: [],
      };
      
      const itemToUpdate = {
        _id: 'helloWorld',
        foo: 'bar',
      };
      
      const itemUpdates = {
        _id:    'helloWorld',
        foo:    'baz',
        listId: 'fubar',
      };
      
      this.$httpBackend
        .expect('PUT', `${__API_URL__}/lists/${parentList._id}/items/${itemToUpdate._id}`)
        .respond(itemUpdates);
      
      this.itemManager.updateItem(itemToUpdate, parentList, itemUpdates)
        .then((item) => {
          expect(item).toBe(itemToUpdate);
          expect(item.foo).toEqual(itemUpdates.foo);
          done();
        })
        .catch(done.fail);
      
      this.$httpBackend.flush();
    });
    
    it('should try to move the item between lists if the listId does not match parentList._id', function(done) {
      var itemMovedBetweenListsFlag = false; 
      this.itemManager.moveItemFromListToList = () => {
        itemMovedBetweenListsFlag = true;
        return this.$q.resolve();
      };
      
      const itemToMove = {
        _id: 'itemToMove',
        foo: 'bar',
      };
      
      const sourceList = {
        _id:   'sourceList',
        items: [itemToMove],
      };
      
      const destinationList = {
        _id:   'destinationList',
        items: [],
      };
      
      const itemUpdates = {
        _id:    'itemToMove',
        foo:    'baz',
        listId: destinationList._id,
      };
      
      this.$httpBackend
        .expect('PUT', `${__API_URL__}/lists/${sourceList._id}/items/${itemToMove._id}`, itemUpdates)
        .respond(itemUpdates);
      
      this.itemManager.updateItem(itemToMove, sourceList, itemUpdates)
        .then((item) => {
          expect(item).toBe(itemToMove);
          expect(item.foo).toEqual(itemUpdates.foo);
          expect(itemMovedBetweenListsFlag).toEqual(true);
          done();
        })
        .catch(done.fail);
      
      this.$httpBackend.flush();
    });
  });
  
  describe('moveItemFromListToList', function() {
    it('should let you move an item from one list to another', function(done) {
      const itemToMove = {
        _id: 'itemToMove',
      };
      
      const sourceList = {
        _id:   'sourceList',
        items: [itemToMove],
      };
      const dummySourceListUpdateServerResponse = assign({}, sourceList, {
        items: [],
      });
      
      const destinationList = {
        _id:   'destinationList',
        items: [],
      };
      const dummyDestinationListUpdateServerResponse = assign({}, destinationList, {
        items: [itemToMove],
      });
      
      this.listManager.lists.push(sourceList, destinationList);
      
      this.$httpBackend
        .expect('PUT', `${__API_URL__}/lists/${sourceList._id}`, dummySourceListUpdateServerResponse)
        .respond(dummySourceListUpdateServerResponse);
      
      this.$httpBackend
        .expect('PUT', `${__API_URL__}/lists/${destinationList._id}`, dummyDestinationListUpdateServerResponse)
        .respond(dummyDestinationListUpdateServerResponse);
      
      this.itemManager.moveItemFromListToList(itemToMove, sourceList, destinationList._id)
        .then((serverResponses) => {
          expect(sourceList.items).toEqual([]);
          expect(destinationList.items[0]).toEqual(itemToMove);
          done();
        })
        .catch(done.fail);
      
      this.$httpBackend.flush();
    });
  });
  
});
