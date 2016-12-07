/* global template */

angular.module('todo-navbar')
  .directive('todoNavbar', todoNavbar);

function todoNavbar() {
  return {
    restrict:     'E', 
    controller:   'NavbarController', 
    controllerAs: 'navCtrl',
    template:     template, 
    scope:        {
      toggleVisibility: '&',
    },
  };
}
  
