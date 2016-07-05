(function() {
  angular.module('todo-app', [
    'ngRoute',
    'todo-services', 
    'todo-entry', 
    'todo-navbar', 
    'todo-item', 
    'todo-list', 
    'todo-board',
  ])
  .config(['$routeProvider', '$locationProvider', todoRouter]);
  
  function todoRouter($routeProvider, $locationProvider) {
    $routeProvider
      .when('/login', {
        controller:   'EntryController', 
        controllerAs: 'entryCtrl',
        template:     require('../components/entry/entry-view.html'),
      })
      .when('/board', {
        controller:   'BoardController', 
        controllerAs: 'boardCtrl',
        template:     require('../components/board/board-view.html'),
      })
      .otherwise('/login');
  }
  
})();
