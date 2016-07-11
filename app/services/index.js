(function() {
  angular.module('todo-services', ['ngCookies']);
})();

require('./api-request.js');
require('./reroute-check.js');
require('./item-manager.js');
require('./list-manager.js');
