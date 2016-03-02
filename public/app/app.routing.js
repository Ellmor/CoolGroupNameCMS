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
                controller: 'mvMainCtrl',
                controllerAs: 'vm'
            })
            .when('/signup', {
                templateUrl: '/partials/account/signup',
                controller: 'userController',
                controllerAs: 'vm'
            })
            .when('/admin', {
                templateUrl: '/partials/admin/main-panel',
                controller: 'adminController',
                controllerAs: 'vm'
            })
            .when('/admin/users', {
                templateUrl: '/partials/admin/users/views/admin-panel',
                controller: 'userController',
                controllerAs: 'vm'
            })
            .when('/admin/users/edit/:userId', {
                templateUrl: '/partials/admin/users/views/admin-edit',
                controller: 'userController',
                controllerAs: 'vm'
            })
            .when('/dashboard', {
                templateUrl: '/partials/admin/dashboard/dashboard',
                controller: 'dashboardController',
                controllerAs: 'db'
            })
            .otherwise({ redirectTo: '/' });
    }
})()