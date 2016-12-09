/* eslint-env jasmine */
/* global inject */

const assign = require('lodash.assign');

describe('listManager', function() {
  
  beforeEach(function() {
    angular.mock.module('todo-services');
  });
  
  beforeEach(inject(function($injector) {
    this.$injector       = $injector;
    this.$httpBackend    = $injector.get('$httpBackend');
    this.$window         = $injector.get('$window');
    this.listManager     = $injector.get('listManager');
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
  
  it('should be able to instantiate the listManager correctly', function() {
    expect(this.listManager).toBeDefined();
    expect(this.listManager.lists).toEqual([]);
  });
  
  describe('getAllLists', function() {
    it('should be able to get all lists', function(done) {
      const dummyAllTodoLists = [{ hello: 'world' }];
      
      this.$httpBackend
        .expect('GET', `${__API_URL__}/lists`)
        .respond(dummyAllTodoLists);
      
      this.listManager.getAllLists()
        .then((lists) => {
          expect(this.listManager.lists).toBe(lists);
          expect(this.listManager.lists).toEqual(dummyAllTodoLists);
          done();
        })
        .catch(done.fail);
      
      this.$httpBackend.flush();
    });
  });
  
  describe('getItemsInList', function() {
    it('should be able to get the items in a list', function(done) {
      const dummyTodoList = { 
        _id:   'fubar', 
        items: [], 
      };
      const dummyItemsList = [
        { _id: '1' }, 
        { _id: '2' }, 
      ];
      
      this.$httpBackend
        .expect('GET', `${__API_URL__}/lists/${dummyTodoList._id}/items`)
        .respond(dummyItemsList);
      
      this.listManager.getItemsInList(dummyTodoList)
        .then((originalList) => {
          expect(originalList).toBe(dummyTodoList);
          expect(originalList.items).toEqual(dummyItemsList);
          done();
        })
        .catch(done.fail);
      
      this.$httpBackend.flush();
      
    });
  });
  
  describe('postNewList', function() {
    it('should be able to post a new list', function(done) {
      const dummyListInfo = {
        foo: 'bar',
      };
      
      const dummyServerResponse = assign({
        items: [], 
        _id:   'fubar',
      }, dummyListInfo);
      
      this.$httpBackend
        .expect('POST', `${__API_URL__}/lists`, dummyListInfo)
        .respond(dummyServerResponse);
      
      this.listManager.postNewList(dummyListInfo)
        .then((list) => {
          const listFromSessionStorage = angular.fromJson(this.$window.sessionStorage.getItem('todo-user-lists'));
          expect(list).toBe(dummyListInfo);
          expect(list).toEqual(dummyServerResponse);
          expect(listFromSessionStorage).toEqual(this.listManager.lists);
          done();
        })
        .catch(done.fail);
      
      expect(this.listManager.lists).toContain(dummyListInfo);  
      this.$httpBackend.flush();
    });
  });
  
  describe('updateList', function() {
    it('should be able to update a list', function(done) {
      const dummyOriginalList = {
        _id: 'fubar', 
        foo: 'bar',
      };
      const dummyOriginalListWithChanges = assign({}, dummyOriginalList, {
        foo: 'baz',
      });
      
      this.$httpBackend
        .expect('PUT', `${__API_URL__}/lists/${dummyOriginalList._id}`, dummyOriginalListWithChanges)
        .respond(dummyOriginalListWithChanges);
      
      this.listManager.updateList(dummyOriginalList, dummyOriginalListWithChanges)
        .then((list) => {
          expect(list).toBe(dummyOriginalList);
          expect(list.foo).toEqual(dummyOriginalListWithChanges.foo);
          done();
        })
        .catch(done.fail);
      
      this.$httpBackend.flush();
    });
  });
  
  describe('deleteList', function() {
    it('should be able to delete a list', function(done) {
      const dummyListToDelete = {
        _id: 'fubar',
      };
      
      this.listManager.lists.push(dummyListToDelete);
      
      this.$httpBackend
        .expect('DELETE', `${__API_URL__}/lists/${dummyListToDelete._id}`)
        .respond(204, {});
      
      this.listManager.deleteList(dummyListToDelete)
        .then((list) => {
          expect(this.listManager.lists).not.toContain(dummyListToDelete);
          done();
        })
        .catch(done.fail);
      
      this.$httpBackend.flush();
    });
  });
  
  describe('setCurrentList', function() {
    it('should correctly set the currentList', function() {
      const currentList = { _id: 'fubar' };
      this.listManager.setCurrentList(currentList);
      expect(this.listManager.currentList).toEqual(currentList._id);
    });
  });
  
  
});
