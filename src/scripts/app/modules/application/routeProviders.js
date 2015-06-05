define(function() {
  return ['$routeProvider',
        function($routeProvider) {
            $routeProvider.
                when('/route1', {
                    templateUrl: 'angular-route-template-1.jsp',
                    controller: 'RouteController'
                }).
                when('/route2', {
                    templateUrl: 'angular-route-template-2.jsp',
                    controller: 'RouteController'
                }).
                otherwise({
                    redirectTo: '/'
                });
        }];
});