//__author__ = 'Jarek'


(function(){
    'use strict';

    angular.module('application.orders.directives').directive('order', order);

    function order(){
        var directive ={
            restrict: 'E',
            scope: {
                order: '='
            },
            templateUrl: 'static/templates/order/order.html'
        };

        return directive;
    }
})();
