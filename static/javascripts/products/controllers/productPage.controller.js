/**
 * Created by slawek on 2015-05-09.
 */



(function () {
    'use strict';

    angular.module('application.products.controllers').controller('productPage', ProductPageController);

    ProductPageController.$inject = ['ProductService', '$routeParams', 'Utileeer', 'BasketService', 'Snackbar'];

    /**
     * @class ProductPageController
     * @description Contains all functionality available on product page.
     * @param ProductService Injected service which allow download data about products.
     * @param $routeParams Injected service which allow get data from url.
     * @param Utileeer Injected util service.
     * @param BasketService Injected service which allow add product into basket.
     * @param Snackbar Injected service which show small window with information about fail during download data
     */
    function ProductPageController(ProductService, $routeParams, Utileeer, BasketService, Snackbar) {
        var vm = this;
        vm.isNotEmpty = Utileeer.isNotEmpty;
        /**
         * @property quantity
         * @description number of product which user want buy.
         * @type {number}
         */
        vm.quantity = 1;
        /**
         * @property basic
         * @description Basic information about product.
         * @type {Object}
         */
        vm.basic = {};
        /**
         * @property specification
         * @description Specification of product.
         * @type {Object}
         */
        vm.specification = {};
        vm.buyProduct = buyProduct;

        activate();
        /**
         * @method activate
         * @description Method execute after create controller. Download data about selected product.
         */
        function activate() {
            var name = $routeParams.productName;
            ProductService.getProduct(name).then(successGetProduct, failGetProduct);
        }

        /**
         * @method buyProduct
         * @description Add product to basket.
         */
        function buyProduct() {
            if (vm.quantity + BasketService.getProductQuantity(vm.basic.id) <= vm.basic.available) {
                BasketService.add(vm.basic.id, vm.quantity, vm.basic.price);
            }
            else {
                Snackbar.error("Cannot add more products than available");
            }
        }

        /**
         * @method successGetProduct
         * @description Action invoked after success download data from server, save data in controller and concat specification.
         * @param data {Object} Downloaded data
         */
        function successGetProduct(data) {
            vm.basic = data.data;
            concatSpecification()
        }

        /**
         * @method concatSpecification
         * @description Concat specification from different sources.
         */
        function concatSpecification() {
            var allSpecification = {};
            for (var tab in vm.basic.productSpecification) {
                jQuery.extend(allSpecification, vm.basic.productSpecification[tab].token[0].fields);
            }
            vm.basic.productSpecification = {};
            vm.specification = allSpecification;
        }

        /**
         * @method failGetProduct
         * @description Action invoked after failed download data from server, show information about fail.
         */
        function failGetProduct() {
            Snackbar.error('Fail downloaded product data!');
        }
    }
})();