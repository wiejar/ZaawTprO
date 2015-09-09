/**
 * Created by slawek on 2015-05-02.
 */

(function () {
    'use strict';

    angular.module('application.products.controllers').controller('ProductsController', ProductsController);

    ProductsController.$inject = ['ProductService', '$location', '$routeParams', 'Snackbar'];

    /**
     * @class ProductsController
     * @description Contains all functionality available on products page.
     * @param ProductService Injected service which allow download data about products.
     * @param $location Injected service which allow go into another page.
     * @param $routeParams Injected service which allow get data from url.
     * @param Snackbar Injected service which show small window with information about fail during download data
     */
    function ProductsController(ProductService, $location, $routeParams, Snackbar) {
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
         * @description Method execute after create controller. Download products data in selected category.
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

        /**
         * @method successGetProducts
         * @description Action invoked after success download data from server, save data in controller and concat specification.
         * @param data {Object} Downloaded data
         */
        function successGetProducts(data) {
            vm.poducts = data.data;
        }

        /**
         * @method failGetProducts
         * @description Action invoked after failed download data from server, show information about fail.
         */
        function failGetProducts() {
            Snackbar.error('Fail downloaded products!');
        }
    }
})();