(function () {
    'use strict';
    angular
        .module('app')
        .config(config)
        .run(run);

    function config ($routeProvider, $locationProvider) {
        var routeRoleChecks = {
            admin: {
                auth: function(mvAuth) {
                    return mvAuth.authorizeCurrentUserForRoute("admin");
                }
            },
            commentator: {
                auth: function(mvAuth) {
                    return mvAuth.authorizeCurrentUserForRoute("commentator");
                }
            }
        };

        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {
                templateUrl: '/partials/main/main',
                controller: 'mvMainCtrl',
                controllerAs: 'vm'
            })
            .when('/signup', {
                templateUrl: '/partials/signup/signup',
                controller: 'signUpController',
                controllerAs: 'vm'
            })
            .when('/admin', {
                templateUrl: '/partials/dashboard/dashboard',
                controller: 'dashboardController',
                controllerAs: 'vm',
                resolve: routeRoleChecks.admin
            })
            .when('/admin/users', {
                templateUrl: '/partials/users/list-users',
                controller: 'userController',
                controllerAs: 'vm',
                resolve: routeRoleChecks.admin
            })
            .when('/admin/users/edit/:userId', {
                templateUrl: '/partials/users/edit-user',
                controller: 'userController',
                controllerAs: 'vm'
            })
            .when('/commentator/profile', {
                templateUrl: '/partials/profile/commentator-profile',
                controller: 'commentatorController',
                controllerAs: 'vm',
                resolve: routeRoleChecks.commentator
            })
            .otherwise('/');
    };

    function run ($rootScope, $location, mvIdentity){
        //runs on route change. Used to redirect users when logged in based on roles
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            if($location.path() === '/backend'){
                if(mvIdentity.currentUser && mvIdentity.currentUser.roles.indexOf("admin")>-1){
                    $location.path('/admin');
                } else if(mvIdentity.currentUser && mvIdentity.currentUser.roles.indexOf("commentator")>-1){
                    $location.path('/commentator/profile');
                }
            }
        });

        //used to redirect rejected paths based on roles (rejected in resolve)
        $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection){
            if(rejection === 'not authorized'){
                $location.path('/');
            }
        });
    };
})()