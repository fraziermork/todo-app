/* eslint-env jasmine */
/* global inject */
// TODO: figure out how to test cookie auth stuff 

const requestConfig = {
  method:   'GET', 
  endpoint: 'test',
  options:  {
    headers: {
      hello: 'world',
    },
  }, 
};

describe('apiRequest', function() {
  
  beforeEach(function() {
    angular.mock.module('todo-services', ($httpProvider) => {
      this.$httpProvider = $httpProvider;
    });
  });
  
  beforeEach(inject(function($injector) {
    this.$injector       = $injector;
    this.$httpBackend    = $injector.get('$httpBackend');
    this.$cookies        = $injector.get('$cookies');
    this.$http           = $injector.get('$http');
    this.xsrfInterceptor = $injector.get('xsrfInterceptor');
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
  
  it('should provide the correct xsrfInterceptor', function() {
    expect(this.xsrfInterceptor).toBeDefined();
  });
  
  it('should not attach a header if no cookie is present', function() {
    expect(this.xsrfInterceptor.request({ headers: {} })).toEqual({ headers: {} });
  });
  
  it('should attach a header if a cookie is present', function() {
    const cookieAuthToken = 'helloWorld';
    this.$cookies.put(__COOKIE_NAME__, cookieAuthToken);
    expect(this.xsrfInterceptor.request({ headers: {} })).toEqual({ 
      headers: {
        [`X-${__COOKIE_NAME__}`]: cookieAuthToken,
      }, 
    });
  });
  
  it('should include xsrfInterceptor as an interceptor for $http', function() {
    expect(this.$httpProvider.interceptors).toContain('xsrfInterceptor');
  });
  
  it('should attach header to requests', function(done) {
    const authHeaderName         = `X-${__COOKIE_NAME__}`;
    const cookieAuthToken        = 'helloWorld';

    this.$cookies.put(__COOKIE_NAME__, cookieAuthToken);
    this.$httpBackend
      .expect(requestConfig.method, requestConfig.endpoint, null, function(headers) {
        expect(headers[authHeaderName]).toEqual(cookieAuthToken);
        return true;
      })
      .respond(200, {
        foo: 'bar',
      });
      
    this.$http({
      method: requestConfig.method, 
      url:    requestConfig.endpoint,
    })
      .then((res) => {
        expect(res.data.foo).toEqual('bar');
        done();
      })
      .catch(done.fail);
    
    this.$httpBackend.flush(); 
  });
    
  
});
