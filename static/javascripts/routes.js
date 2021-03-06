/**
 * Created by slawek on 2015-04-12.
 */
(function () {
    'user strict';

    var RoutesApp = angular.module('application.routes');
    RoutesApp.config(config);

    config.$inject = ['$routeProvider'];

    /**
     * @class config
     * @description This class creates configuration of possible actions.
     * @param $routeProvider Injected service which provides routes for actions.
     */
    function config($routeProvider) {
        $routeProvider.when('/register', {
            controller: 'RegisterController',
            controllerAs: 'vm',
            templateUrl: '/static/templates/authentication/register.html'
        }).when('/login', {
            controller: 'LoginController',
            controllerAs: 'vm',
            templateUrl: '/static/templates/authentication/login.html'
        }).when('/settings/:username', {
            controller: 'ProfileSettingsController',
            controllerAs: 'vm',
            templateUrl: '/static/templates/profiles/settings.html'
        }).when('/product/:productName', {
            controller: 'productPage',
            controllerAs: 'vm',
            templateUrl: '/static/templates/products/productPage.html'
        }).when('/category/:categoryName', {
            controller: 'ProductsController',
            controllerAs: 'vm',
            templateUrl: '/static/templates/temporary/productShow.html'
        }).when('/basket', {
            controller: 'BasketController',
            controllerAs: 'vm',
            templateUrl: '/static/templates/basket/basketPage.html'
        }).when('/orderparameters', {
            controller: 'OrderController',
            controllerAs: 'vm',
            templateUrl: '/static/templates/order/orderParameters.html'
        }).when('/orders', {
            controller: 'OrderController',
            controllerAs: 'vm',
            templateUrl: '/static/templates/order/orders.html'
        }).when('/order/:id', {
            controller: 'ProductOrderController',
            controllerAs: 'vm',
            templateUrl: '/static/templates/order/orderDetails.html'
        }).when('/home', {
            controller: 'ProductsController',
            controllerAs: 'vm',
            templateUrl: '/static/templates/temporary/productShow.html'
        }).otherwise('/home');
    }
})();