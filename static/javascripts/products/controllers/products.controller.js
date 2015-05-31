/**
 * Created by slawek on 2015-05-02.
 */

(function () {
    'use strict';

    angular.module('application.products.controllers').controller('ProductsController', ProductsController);

    ProductsController.$inject = ['$scope', 'Picture', 'ProductService', '$location'];

    function ProductsController($scope, Picture, ProductService, $location) {
        var vm = this;
        vm.columns = [];


        Picture.get(1).then(successGetPicture, failGetPicture);
        ProductService.getByCategory(/*'None'*/).then(successGetProducts, failGetProducts);

        vm.poducts = [];

        activate();

        function activate() {

            $scope.$watchCollection(function () {
                return $scope.poducts
            }, render);
            $scope.$watch(function () {
                return $(window).width();
            }, render);

            //    picture.get(1).then(createPostSuccessFn, createPostErrorFn);;
            render(vm.poducts, null);
            countProperty();
        }

        function calculateNumberOfColumns() {
            var width = $(window).width();

            if (width >= 1200) {
                return 12;
            } else if (width >= 992) {
                return 3;
            } else if (width >= 768) {
                return 2;
            } else {
                return 1;
            }
        }

        vm.dial = dial;

        function dial(uniqueName) {
            $location.path('/product/' + uniqueName);
        }

        function render(current, original) {
            if (current !== original) {
                vm.columns = [];

                var colLength = calculateNumberOfColumns();

                for (var i = 0; i < colLength; i++) {
                    vm.columns.push([]);
                }

                for (var i = 0; i < current.length; i++) {
                    vm.columns[i % colLength].push(current[i]);
                }
            }
        }

        function countProperty() {
            var width = Math.floor($(window).width() / calculateNumberOfColumns()) + "px";
        }

        vm.result = ' elo';

        function successGetPicture(data, status, headers, cinfig) {
            vm.result = data.data;
        }

        function failGetPicture(data, status, headers, cinfig) {
            vm.result = data.error;
            console.log(vm.result);
        }

        function successGetProducts(data, status, headers, cinfig) {
            vm.poducts = data.data;
            render(vm.poducts, null);
        }

        function failGetProducts(data, status, headers, cinfig) {
            vm.resultProducts = data.error;
            console.log(vm.resultProducts);
        }
    }
})();