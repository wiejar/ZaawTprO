/**
 * Created by slawek on 2015-06-13.
 */

(function () {
    'use strict';

    angular.module('application.products.directives')
        .directive('priceField', PriceField);

    /**
     * @method PriceField
     * @description Contain definition od Price field directive. This directive is element. It has 1 parameters : value.
     * @returns {Object} Definition of directive.
     */
    function PriceField() {
        return {
            restrict: 'E',
            templateUrl: 'static/templates/products/priceField.html',
            scope: {
                value: '='
            }
        }
    }
})();