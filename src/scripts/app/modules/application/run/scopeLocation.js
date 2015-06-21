define([], function() {
  return function($rootScope, $location) {
    $rootScope.location = $location;
  };
});