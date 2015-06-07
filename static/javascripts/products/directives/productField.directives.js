/**
 * Created by slawek on 2015-06-01.
 */

(function () {
    'use strict';

    angular.module('application.products.directives')
        .directive('productField', ['Utileeer', productField]);

    function link(scope) {
        scope.Utileeer = Utileeer;
    }

    function productField(Utileeer) {
        return {
            restrict: 'E',
            templateUrl: 'static/templates/products/productField.html',
            scope: {
                name: '@',
                value: '@',
                units: '@'
            },
            link: function (scope, element, attrs) {
                scope.Utileeer = Utileeer;
            }
        }
    }
})();