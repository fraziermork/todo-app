/* eslint-env jasmine */
/* global inject */

describe('Item manager service', function() {
  var $httpBackend;
  var apiRequest;
  
  beforeEach(function() {
    angular.mock.module('todo-services');
  });
  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    apiRequest  = $injector.get('apiRequest');
  }));
  
  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });
  
  it('should agree that true is true', function() {
    expect(true).toBe(true);
  });
  
});
