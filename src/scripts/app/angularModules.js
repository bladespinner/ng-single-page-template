/*
 * Load and bootstrap angular modules
 */

define([
  'angular',
  'app/modules/application/main',
], function(angular,application) {
  var bootstrap = function() {
    angular.element(document).ready(function() {
      angular.bootstrap(document, [application.name]);
    });
  };
  return {bootstrap:bootstrap};
});