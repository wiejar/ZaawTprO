/**
 * Created by slawek on 2015-05-09.
 */



(function () {
    'use strict';

    angular.module('application.products.controllers').controller('productPage', productPage);

    productPage.$inject = ['$scope', '$sce', 'ProductService', '$routeParams'];

    function productPage($scope, $sce, ProductService, $routeParams) {
        var vm = this;

        var basic = {
            name: "burger",
            pictures: [],
            shortDesc: "kotlet z pierzynką",
            price: 100,
            uniqueName: 'uniqueName',
            detailDesc: [{url: 'temp.html'}]
        };

        activate();
        //ProductService.getProduct()
        function activate() {
            var name = $routeParams.productName;
            ProductService.getProduct(name).then(successGetProduct, failGetProduct);
        }

        vm.quantity = 1;
        vm.basic = basic;
        vm.examples = 'example';

        function successGetProduct(data, status, headers, config) {
            vm.basic = data.data;
            vm.examples = vm.basic;
        }


        function failGetProduct(data, status, headers, config) {
            vm.examples = data;
        }
    }
})();