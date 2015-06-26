/*
 * Construct the application module
 */

define([
  './moduleInit',
  './routeProviders',
  './controllers/homeController',
  './controllers/testController',
  './templateCache',
  './run/scopeLocation'
], function(module,
            routeProviders,
            homeController,
            testController,
            templateCache,
            scopeLocation) {
  
  //register route providers
  module.config(routeProviders);
  
  //register controllers
  module.controller("HomeController", homeController);
  module.controller("TestController", testController);
  
  //register auto generated view template cache
  module.run(templateCache);
  
  //add the location propery to the scope
  module.run(scopeLocation);
  return module;
});