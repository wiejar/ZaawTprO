//__author__ = 'Jarek'

(function(){
    'use strict';

    angular.module('application.orders.directives').directive('order', order);

    function order(){
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
