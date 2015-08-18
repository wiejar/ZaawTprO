/**
 * Created by slawek on 2015-06-01.
 */

(function () {
    'use strict';

    angular.module('application.products.directives')
        .directive('productField', ['Utileeer', ProductField]);

    /**
     * @method ProductField
     * @description Contain definition od Product field directive.
     * This directive is element. It has 3 parameters : name, value, units.
     * Represent single information about product.
     * @returns {Object} Definition of directive.
     */
    function ProductField(Utileeer) {
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