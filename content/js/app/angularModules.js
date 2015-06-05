define([
  'angular',
  'app/modules/application/main',
], function(angular,application) {
  var bootstrap = function() {
    angular.element(document).ready(function() {
      angular.bootstrap(document, [application.name]);
      setTimeout(function () {
        alert('test');
      },5000);
    });
  };
  return {bootstrap:bootstrap};
});