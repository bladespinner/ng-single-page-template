define([
  './moduleInit',
  './routeProviders'
], function(module,routeProviders) {
  module.config(routeProviders);
  return module;
});