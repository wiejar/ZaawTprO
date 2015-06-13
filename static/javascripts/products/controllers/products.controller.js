/**
 * Created by slawek on 2015-05-02.
 */

(function () {
    'use strict';

    angular.module('application.products.controllers').controller('ProductsController', ProductsController);

    ProductsController.$inject = ['$scope', 'ProductService', '$location', '$routeParams'];

    function ProductsController($scope, ProductService, $location, $routeParams) {
        var vm = this;
        vm.poducts = [];
        vm.dial = dial;
        vm.filter = {};

        activate();

        function activate() {
            var category = $routeParams.categoryName;
            ProductService.getByCategory(category).then(successGetProducts, failGetProducts);
        }

        function dial(uniqueName) {
            $location.path('/product/' + uniqueName);
        }

        function successGetProducts(data, status, headers, cinfig) {
            vm.poducts = data.data;
        }

        function failGetProducts(data, status, headers, cinfig) {
            console.log(data);
        }
    }
})();