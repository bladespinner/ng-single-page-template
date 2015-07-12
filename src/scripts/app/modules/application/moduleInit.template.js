/*
 * Initialize the angular module, with its name and 
 * angular module dependencies.
 */
define([
  'angular',
  /* @if NODE_ENV='test' **
  'angular-mocks',
  /* @endif */
  'angular-route'
], function(angular) {
  var module = angular.module("spTemplate", ['ngRoute'
  /* @if NODE_ENV='test' **
    ,'ngMock'
  /* @endif */
  ]);
  return module;
});