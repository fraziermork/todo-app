/* global __API_URL__ __DEVONLY__ */

const defaults = require('lodash.defaults');

(function() {
  angular.module('todo-services')
    .factory('apiRequest', [
      '$log', 
      '$http', 
      '$window', 
      returnApiRequest
    ]);
  
  function returnApiRequest($log, $http, $window) {
    
    /**    
     * apiRequest - a service to make requests to the backend api 
     *            - authentication should be handled automatically by angular
     *      
     * @param  {string} method   an http method      
     * @param  {string} endpoint the path for the endpoint to hit, minus the base url     
     * @param  {object} options  the options you want to send with the request, like the data       
     */     
    return function apiRequest(method, endpoint, options = {}) {
      let defaultApiRequestOptions = {
        method: method.toUpperCase(), 
        url:    `${__API_URL__}/${endpoint}`
      };
      defaults(options, defaultApiRequestOptions);
      if (__DEVONLY__) $log.warn(`MAKING ${method} REQUEST TO /${endpoint}`); 
      
      return new Promise((resolve, reject) => {
        $http(options)
          .then((res) => {
            if (__DEVONLY__) $log.info('SUCCESS in apiRequest:', res); 
            return resolve(res.data);
          })
          .catch((errRes) => {
            if (__DEVONLY__) $log.error('ERROR in apiRequest:', errRes);
            return reject(errRes.data);
          });
      });
    };
  }
  
})();
