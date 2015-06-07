/**
 * Created by slawek on 2015-06-07.
 */

(function () {
    'use strict';

    angular.module('application.basket.controllers').controller('BasketController', BasketController);

    BasketController.$inject = ['$scope', 'BasketService', 'ProductService'];

    function BasketController($scope, BasketService, ProductService) {
        var vm = this;
        vm.data = BasketService.get();
        vm.productTable = [];
        vm.map = [];
        vm.changeQuantity = changeQuantity;
        vm.remove = remove;
        vm.removeAll = removeAll;
        vm.toPay = toPay;

        activate();

        function activate() {
            vm.data = BasketService.get();
            for (var elem in vm.data) {
                var productId = vm.data[elem].productId;
                vm.map[productId] = elem;
                ProductService.getSimpleProduct(productId).then(successGet, failGet);
            }
        }

        function changeQuantity(productId, quantity) {
            BasketService.set(productId, quantity);
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

        function toPay() {
            console.log('toPay');
        }

        function successGet(data, status, headers, cinfig) {
            var product = data.data;
            var elem = vm.map[product.id];
            product.quantity = vm.data[elem].quantity;
            vm.productTable[elem] = product;
        }

        function failGet(data, status, headers, cinfig) {
            console.log(data);
        }
    }
})();