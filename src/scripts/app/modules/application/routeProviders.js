define([],function() {
  return ['$routeProvider',
        function($routeProvider) {
            $routeProvider.
                when('/', {
                    templateUrl: 'content/views/home.html',
                    controller: 'HomeController'
                }).
                when('/test', {
                    templateUrl: 'content/views/test.html',
                    controller: 'TestController'
                }).
                otherwise({
                    redirectTo: '/'
                });
        }];
});