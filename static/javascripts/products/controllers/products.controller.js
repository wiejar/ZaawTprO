/**
 * Created by slawek on 2015-05-02.
 */

(function () {
    'use strict';

    angular.module('application.products.controllers').controller('ProductsController', ProductsController);

    ProductsController.$inject = ['ProductService', '$location', '$routeParams'];

    /**
     * @class ProductsController
     * @description Contains all functionality available on products page.
     * @param ProductService Injected service which allow download data about products.
     * @param $location Injected service which allow go into another page.
     * @param $routeParams Injected service which allow get data from url.
     */
    function ProductsController(ProductService, $location, $routeParams) {
        var vm = this;
        /**
         * @properties products
         * @description Array of products which should be visible on the page.
         * @type {Array}
         */
        vm.poducts = [];
        vm.dial = dial;
        /**
         * @properties filter
         * @description Contain data for filter over product.
         * @type {Object}
         */
        vm.filter = {};

        activate();

        /**
         * @method activate
         * @description Method execute after create controller. Download data about products in selected category.
         */
        function activate() {
            var category = $routeParams.categoryName;
            ProductService.getByCategory(category).then(successGetProducts, failGetProducts);
        }

        /**
         * @method dial
         * @description Go to product page.
         * @param uniqueName {String} Product, which should be showed.
         */
        function dial(uniqueName) {
            $location.path('/product/' + uniqueName);
        }

        function successGetProducts(data) {
            vm.poducts = data.data;
        }

        function failGetProducts(data) {
            console.log(data);
        }
    }
})();