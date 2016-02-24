(function(){
    "use strict";

    angular
        .module('app', ['ngResource', 'ngRoute'])

        .config(function ($routeProvider, $locationProvider) {
            $locationProvider.html5Mode(true);

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
        });

})();
