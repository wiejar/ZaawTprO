/**
 * Created by slawek on 2015-05-09.
 */



(function () {
    'use strict';

    angular.module('application.products.controllers').controller('productPage', productPage);

    productPage.$inject = ['$scope', '$sce', 'ProductService', '$routeParams', 'Utileeer', 'BasketService'];

    function productPage($scope, $sce, ProductService, $routeParams, Utileeer, BasketService) {
        var vm = this;
        vm.isNotEmpty = Utileeer.isNotEmpty;        
        vm.quantity = 1;
        vm.examples = 'example';
        vm.buyProduct = buyProduct;

        activate();

        function activate() {
            var name = $routeParams.productName;
            ProductService.getProduct(name).then(successGetProduct, failGetProduct);
        }

        function buyProduct() {
            BasketService.add(vm.basic.id, vm.quantity, vm.basic.price);
        }

        function successGetProduct(data, status, headers, config) {
            vm.basic = data.data;
            vm.examples = vm.basic;
            concatSpecification()
        }

        function concatSpecification() {
            var allSpecification = {};
            for (var tab in vm.basic.productSpecification) {
                jQuery.extend(allSpecification, vm.basic.productSpecification[tab].token[0].fields);
            }

            vm.basic.allSpecification = allSpecification;
        }


        function failGetProduct(data, status, headers, config) {
            vm.examples = data;
        }
    }
})();