//__author__ = 'Jarek'


(function(){
    'use strict';

    angular.module('application.orders.directives').directive('order', order);

    /**
     * @method order
     * @description Contain definition od ProductOrder field directive. This directive is element. It has 1 parameters : order.
     * @returns {Object} Definition of directive.
     */
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
