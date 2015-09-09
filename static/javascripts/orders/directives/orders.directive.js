//__author__ = 'Jarek'

(function(){
    'use strict';

    angular.module('application.orders.directives').directive('orders', orders);

    /**
     * @method order
     * @description Contain definition od Order field directive. This directive is element. It has 1 parameters : order.
     * @returns {Object} Definition of directive.
     */
    function orders(){
        var directives = {
            controller: 'OrderController',
            controllerAs: 'vm',
            restrict: 'E',
            scope: {
                order: '='
            },
            templateUrl: 'static/templates/orders/orders.html'
        };

        return directives;
    }
})();
