(function() {
    'use strict';

    angular
        .module('app')
        .config(config);

    function config($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
//WORKS
        $routeProvider
            .when('/',
                {
                    templateUrl: '/partials/main',
                    controller: 'MainCtrl',
                    controllerAs: "main"
                })
            .when('/profile',
                {
                    templateUrl: '/partials/profile',
                    controller: 'MainCtrl',
                    controllerAs: "main"
                })
            .when('/test',
                {
                    template: '<p>TEST</p>'
                })
            .otherwise( {redirectTo: '/'});
    };

})();