/// <reference path="../../typings/angularjs/angular.d.ts"/>
/// <reference path="../../typings/jasmine/jasmine.d.ts"/>
define(['app/modules/application/main',
        'app/modules/application/controllers/homeController',
        'angular-mocks'], 
function(homeController) {
  describe("homeController", function() {
    beforeEach(module('spTemplate'));
    
    var $controller;

    beforeEach(inject(function(_$controller_){
      $controller = _$controller_;
    }));
    it("should contain the correct message", function() {
      var $scope = {};
      $controller("HomeController", { $scope : $scope })
      expect($scope.message).toBe("Everyone come and see how good I look!");
    });
  });
});