/**
 * Created by slawek on 2015-05-09.
 */



(function () {
    'use strict';

    angular.module('application.products.controllers').controller('productPage', ProductPageController);

    ProductPageController.$inject = ['ProductService', '$routeParams', 'Utileeer', 'BasketService'];

    /**
     * @class ProductPageController
     * @description Contains all functionality available on product page.
     * @param ProductService Injected service which allow download data about products.
     * @param $routeParams Injected service which allow get data from url.
     * @param Utileeer Injected util service.
     * @param BasketService Injected service which allow add product into basket.
     */
    function ProductPageController(ProductService, $routeParams, Utileeer, BasketService) {
        var vm = this;
        vm.isNotEmpty = Utileeer.isNotEmpty;
        /**
         * @properties quantity
         * @description number of product which user want buy.
         * @type {number}
         */
        vm.quantity = 1;
        /**
         * @properties basic
         * @description Basic information about product.
         * @type {Object}
         */
        vm.basic = {};
        /**
         * @properties specification
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
            BasketService.add(vm.basic.id, vm.quantity, vm.basic.price);
        }

        function successGetProduct(data) {
            vm.basic = data.data;
            concatSpecification()
        }

        function concatSpecification() {
            var allSpecification = {};
            for (var tab in vm.basic.productSpecification) {
                jQuery.extend(allSpecification, vm.basic.productSpecification[tab].token[0].fields);
            }
            vm.basic.productSpecification = {};
            vm.specification = allSpecification;
        }

        function failGetProduct(data) {
            console.log(data);
        }
    }
})();