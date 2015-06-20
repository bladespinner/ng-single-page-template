define([
  './moduleInit',
  './routeProviders',
  './controllers/homeController',
  './controllers/testController'
], function(module,routeProviders,homeController,testController) {
  module.config(routeProviders);
  module.controller("HomeController", homeController);
  module.controller("TestController", testController);
  return module;
});