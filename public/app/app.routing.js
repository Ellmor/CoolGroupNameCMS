(function () {
    'use strict';
    angular
        .module('app')
        .config(config);

    function config ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {
                templateUrl: '/partials/main/main',
                controller: 'mvMainCtrl'
            });
    }
})()