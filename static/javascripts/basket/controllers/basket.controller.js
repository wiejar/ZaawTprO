/**
 * Created by slawek on 2015-06-07.
 */

(function () {
    'use strict';

    angular.module('application.basket.controllers').controller('BasketController', BasketController);

    BasketController.$inject = ['$scope', 'BasketService', 'ProductService', 'Order', '$location', 'Snackbar'];

    function BasketController($scope, BasketService, ProductService, Order, $location, Snackbar) {
        var vm = this;
        vm.data = BasketService.get();
        vm.productTable = [];
        vm.map = [];
        vm.changeQuantity = changeQuantity;
        vm.remove = remove;
        vm.removeAll = removeAll;
        //vm.buy = buy;
        vm.isSomeProduct = isSomeProduct;
        vm.dial = dial;
        vm.productValue = productValue;
        vm.sum = sum;

        activate();

        function activate() {
            vm.data = BasketService.get();
            for (var elem in vm.data) {
                var productId = vm.data[elem].productId;
                vm.map[productId] = elem;
                ProductService.getSimpleProduct(productId).then(successGet, failGet);
            }
        }

        function changeQuantity(productId, quantity, price) {
            BasketService.set(productId, quantity, price);
        }

        function remove(productId) {
            BasketService.remove(productId);
            var ob = vm.map[productId];
            vm.data.splice(ob, 1);
            vm.productTable.splice(ob, 1);
            vm.map.splice(productId, 1);
        }

        function removeAll() {
            BasketService.removeAll();
            vm.data = [];
            vm.productTable = [];
            vm.map = [];
        }

        function isSomeProduct() {
            return vm.productTable && vm.productTable.length;
        }

        function dial(uniqueName) {
            $location.path('/product/' + uniqueName);
        }

        function productValue(product) {
            return product.price * product.quantity;
        }

        function sum() {
            var sum = 0;
            for (var elem in vm.productTable) {
                var product = vm.productTable[elem];
                sum += productValue(product);
            }
            return sum;
        }

        function successGet(data, status, headers, config) {
            var product = data.data;
            var elem = vm.map[product.id];
            product.quantity = vm.data[elem].quantity;
            vm.productTable[elem] = product;
        }

        function failGet(data, status, headers, config) {
            console.log(data);
        }
    }
})();