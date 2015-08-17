/**
 * Created by slawek on 2015-06-01.
 */

(function () {
    'use strict';

    angular.module('application.products.directives')
        .directive('productField', ['Utileeer', productField]);

    function productField(Utileeer) {
        return {
            restrict: 'E',
            templateUrl: 'static/templates/products/productField.html',
            scope: {
                name: '@',
                value: '@',
                units: '@'
            },
            link: function (scope) {
                scope.Utileeer = Utileeer;
            }
        }
    }
})();