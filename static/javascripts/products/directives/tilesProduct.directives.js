/**
 * Created by slawek on 2015-05-02.
 */

(function () {
    'use strict';

    angular.module('application.products.directives')
        .directive('tilesProduct', tilesProduct);

    function tilesProduct() {
        var directive = {
            restrict: 'E',
            scope: {
                product: "=",
                click: "&"
            },
            templateUrl: 'static/templates/products/tilesProduct.html'
        };

        return directive;
    }
})();