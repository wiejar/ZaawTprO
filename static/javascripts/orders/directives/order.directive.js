//__author__ = 'Jarek'


(function(){
    'use strict';

    angular.module('application.orders.directives').directive('order', order);

    function order(){
        var directive ={
            restrict: 'E',
            scope: {
                post: '='
            },
            templateUrl: 'static/templates/orders/order.html'
        };

        return directive;
    }
})();
