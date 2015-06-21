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

  module.config(routeProviders);
  module.controller("HomeController", homeController);
  module.controller("TestController", testController);
  module.run(templateCache);
  module.run(scopeLocation);
  return module;
});