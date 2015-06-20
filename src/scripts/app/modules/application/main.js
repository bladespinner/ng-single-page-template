define([
  './moduleInit',
  './routeProviders',
  './controllers/homeController',
  './controllers/testController',
  './templateCache'
], function(module,
            routeProviders,
            homeController,
            testController,
            templateCache) {

  module.config(routeProviders);
  module.controller("HomeController", homeController);
  module.controller("TestController", testController);
  module.run(templateCache);
  return module;
});