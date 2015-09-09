/**
 * Created by slawek on 2015-06-07.
 */

(function () {
    'use strict';

    angular.module('application.basket.controllers').controller('BasketController', BasketController);

    BasketController.$inject = ['BasketService', 'ProductService', '$location', 'Snackbar'];

    /**
     * @class BasketController
     * @description Contains all functionality available on basket page.
     * @param BasketService Injected service which contains method to get products putted to basket.
     * @param ProductService Injected service which contains method to download product information.
     * @param $location Injected service which allow to change website page during some action.
     */
    function BasketController(BasketService, ProductService, $location, Snackbar) {
        var vm = this;

        var data = [];
        var map = [];
        /**
         * @parameter productTable
         * @description Contains information about product in basket and quantity of selected product.
         * @type {Array}
         */
        vm.productTable = [];
        vm.changeQuantity = changeQuantity;
        vm.remove = remove;
        vm.removeAll = removeAll;
        vm.isSomeProduct = isSomeProduct;
        vm.dial = dial;
        vm.productValue = productValue;
        vm.sum = sum;

        activate();

        /**
         * @method activate
         * @description Method execute after create controller. Download data about product in basket.
         */
        function activate() {
            data = BasketService.get();
            for (var elem in data) {
                var productId = data[elem].productId;
                map[productId] = elem;
                ProductService.getSimpleProduct(productId).then(successGet, failGet);
            }
        }

        /**
         * @method changeQuantity
         * @description Method, which change quantity of item in service.
         * @param productId {number} Product Id
         * @param quantity {number} New quantity
         * @param price {number} Price
         */
        function changeQuantity(productId, quantity, price) {
            BasketService.set(productId, quantity, price);
        }

        /**
         * @method remove
         * @description Remove product from basket.
         * @param productId {number} Product Id
         */
        function remove(productId) {
            BasketService.remove(productId);
            var ob = map[productId];
            data.splice(ob, 1);
            vm.productTable.splice(ob, 1);
            map.splice(productId, 1);
        }

        /**
         * @method removeAll
         * @description Remove all products from basket.
         */
        function removeAll() {
            BasketService.removeAll();
            data = [];
            vm.productTable = [];
            map = [];
        }

        /**
         * @method isSomeProduct
         * @description Return information that in basket is some product.
         * @returns {boolean} True if in basket is some products.
         */
        function isSomeProduct() {
            return vm.productTable && vm.productTable.length;
        }

        /**
         * @method dial
         * @description Redirect to product page.
         * @param uniqueName {String} Unique name of product.
         */
        function dial(uniqueName) {
            $location.path('/product/' + uniqueName);
        }

        /**
         * @method productValue
         * @description Count value for product.
         * @param product {Object} Product object for it this method count value.
         * @returns {number} Counted value.
         */
        function productValue(product) {
            return product.price * product.quantity;
        }

        /**
         * @method sum
         * @description Count sum of value for all products in basket.
         * @returns {number} Counted sum of value.
         */
        function sum() {
            var sum = 0;
            for (var elem in vm.productTable) {
                var product = vm.productTable[elem];
                sum += productValue(product);
            }
            return sum;
        }

        /**
         * @method successGet
         * @description Action invoked after success download data from server, save data in controller.
         * @param data Downloaded data
         */
        function successGet(dataa) {
            var product = dataa.data;
            var elem = map[product.id];
            product.quantity = data[elem].quantity;
            vm.productTable[elem] = product;
        }

        /**
         * @method failGetProduct
         * @description Action invoked after failed download data from server, show information about fail.
         */
        function failGet() {
            Snackbar.error('Get information about product failed');
        }
    }
})();