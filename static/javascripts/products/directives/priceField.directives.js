/**
 * Created by slawek on 2015-06-13.
 */

(function () {
    'use strict';

    angular.module('application.products.directives')
        .directive('priceField', priceField);

    function priceField() {
        return {
            restrict: 'E',
            templateUrl: 'static/templates/products/priceField.html',
            scope: {
                value: '='
            }
        }
    }
})();