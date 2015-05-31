/**
 * Created by slawek on 2015-04-12.
 */
(function () {
    'user strict';

    var RoutesApp = angular.module('application.routes');
    RoutesApp.config(config);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider.when('/register', {
            controller: 'RegisterController',
            controllerAs: 'vm',
            templateUrl: '/static/templates/authentication/register.html'
        }).when('/login', {
            controller: 'LoginController',
            controllerAs: 'vm',
            templateUrl: '/static/templates/authentication/login.html'
        }).when('/productShow', {
            controller: 'ProductsController',
            controllerAs: 'vm',
            templateUrl: '/static/templates/temporary/productShow.html'
        }).when('/+:username', {
            controller: 'ProfileController',
            controllerAs: 'vm',
            templateUrl: '/static/templates/profiles/profile.html'
        }).when('/', {
            controller: 'IndexController',
            controllerAs: 'vm',
            templateUrl: '/static/templates/layout/index.html'
        }).when('/+:username/settings', {
            controller: 'ProfileSettingsController',
            controllerAs: 'vm',
            templateUrl: '/static/templates/profiles/settings.html'
        }).when('/product/:productName', {
            controller: 'productPage',
            controllerAs: 'vm',
            templateUrl: '/static/templates/products/productPage.html'
        }).otherwise('/');
    }
})();