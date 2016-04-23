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
                    var access = mvAuth.authorizeCurrentUserForRoute("admin");
                    return access.resolve;
                }
            },
            author: {
                auth: function(mvAuth) {
                    console.log(mvAuth.authorizeCurrentUserForRoute("author"));
                    console.log (mvAuth.authorizeCurrentUserForRoute("admin"));
                    var access = mvAuth.authorizeCurrentUserForRoute("author");
                    return access.resolve;
                }
            },
            commentator: {
                auth: function(mvAuth) {
                    var access = mvAuth.authorizeCurrentUserForRoute("commentator");
                    return access.resolve;
                }
            }
        };

        var routeAccessChecks = {
            dashboard: {
                auth: function(mvAuth) {
                    var admin = mvAuth.authorizeCurrentUserForRoute("admin");
                    var author = mvAuth.authorizeCurrentUserForRoute("author");
                    return (admin.success || author.success) ? true : (admin.success ? author.resolve: admin.resolve);
                }
            }
        };

        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {
                templateUrl: '/partials/main/main',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .when('/signup', {
                templateUrl: '/partials/signup/signup',
                controller: 'signUpController',
                controllerAs: 'vm'
            })

            .when('/article/:id', {
                templateUrl: '/partials/main-subpage/article',
                controller: 'SubpageController',
                controllerAs: 'page'
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
                controllerAs: 'vm',
                resolve: routeRoleChecks.admin
            })
            .when('/admin/categories',{
                templateUrl: '/partials/category/categories-list',
                controller: 'categoryController',
                controllerAs: 'vm',
                resolve: routeAccessChecks.dashboard
            })
            .when('/admin/categories/edit/:categoryid',{
                templateUrl: '/partials/category/categories-edit',
                controller: 'categoryController',
                controllerAs: 'vm',
                resolve: routeAccessChecks.dashboard

            })
            .when('/admin/tags',{
                templateUrl: 'partials/tags/tags-list',
                controller: 'tagController',
                controllerAs: 'vm',
                resolve: routeAccessChecks.dashboard
            })
            .when('/admin/tags/edit/:tagid',{
                templateUrl: 'partials/tags/edit-tags',
                controller: 'tagController',
                controllerAs: 'vm',
                resolve: routeAccessChecks.dashboard
            })
         /*   .when('/admin/content', {
                templateUrl: '/partials/author/content',
                controller: 'contentController',
                controllerAs: 'vm',
                resolve: routeRoleChecks.admin
            })
            .when('admin/content/edit/:contentId', {
                templateUrl: '/partials/author/edit-content',
                controller: 'contentController',
                controllerAs: 'vm',
                resolve: routeRoleChecks.admin
            })*/
            .when('/dashboard', {
                templateUrl: '/partials/dashboard/dashboard',
                controller: 'dashboardController',
                controllerAs: 'dashboard',
                resolve: routeAccessChecks.dashboard
            })
            .when('/content', {
                templateUrl: '/partials/author/content',
                controller: 'contentController',
                controllerAs: 'vm',
                resolve: routeAccessChecks.dashboard
            })
            .when('/content/edit/:contentId', {
                templateUrl: '/partials/author/edit-content',
                controller: 'contentController',
                controllerAs: 'vm',
                resolve: routeAccessChecks.dashboard
            })
            .when('/commentator/profile', {
                templateUrl: '/partials/profile/commentator-profile',
                controller: 'commentatorController',
                controllerAs: 'vm',
                resolve: routeRoleChecks.commentator
            })
            .when('/passwordRecovery', {
                templateUrl: '/partials/password-recovery/password-recovery',
                controller: 'passwordRecoveryController',
                controllerAs: 'vm'
            })
            .when('/reset/:token', {
                templateUrl: '/partials/password-recovery/password-reset',
                controller: 'passwordResetController',
                controllerAs: 'vm'
            })
            .when('/login', {
                templateUrl: '/partials/login/login',
                controller: 'mvNavBarLoginCtrl',
                controllerAs: 'vm'
            })
            .otherwise('/');
    };

    function run ($rootScope, $location, mvIdentity, ioService){
        //runs on route change. Used to redirect users when logged in based on roles

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            ioService.emit('locationChange', $location.path(), function(){
                console.log('emit');
            });
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
            if(rejection === "not authorized"){
                $location.path('/');
            }
        });
    };
})()