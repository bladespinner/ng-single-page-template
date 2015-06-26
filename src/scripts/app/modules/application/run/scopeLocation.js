/*
 * Add the location object to the scope
 */
define([], function() {
  return function($rootScope, $location) {
    $rootScope.location = $location;
  };
});