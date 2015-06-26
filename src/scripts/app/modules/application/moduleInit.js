/*
 * Initialize the angular module, with its name and 
 * angular module dependencies.
 */
define([
  'angular',
  'angular-route'
], function(angular) {
  var module = angular.module("spTemplate", ['ngRoute']);
  return module;
});