/**
 * Created by slawek on 2015-05-02.
 */

(function () {
    'use strict';

    angular.module('application.products.directives')
        .directive('tilesProduct', TilesProduct);

    /**
     * @method TilesProduct
     * @description Contain definition od tiles directive. This directive is element and has two arguments product (definition of product) and click (action on click on product).
     * @returns {Object} Definition of directive.
     */
    function TilesProduct() {
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