/* global __DEVONLY__ __COOKIE_NAME__ */

(function() {
  angular.module('todo-services')
    .factory('xsrfInterceptor', [
      '$log', 
      '$cookies', 
      returnXsrfInterceptor
    ])
    .config(['$httpProvider', configHttpProvider]);
      
      
  function returnXsrfInterceptor($log, $cookies) {
    let xsrfInterceptor = {
      
      /**      
       * request - this attaches the value of the cookie named __COOKIE_NAME__ to requests as `X-${__COOKIE_NAME__}`
       *        
       * @param  {object} config the config object for the http request        
       * @return {object }       the same config with the header set on it        
       */       
      request: function(config) {
        if (__DEVONLY__) $log.debug('xsrfInterceptor request', config);
        let cookie     = $cookies.get(__COOKIE_NAME__);
        let headerName = `X-${__COOKIE_NAME__}`;
        if (cookie) {
          config.headers[headerName] = cookie;
        }
        return config;
      }
      
    };
    return xsrfInterceptor;
  }    
      
  function configHttpProvider($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.interceptors.push('xsrfInterceptor');
    
  }    
      
})();
