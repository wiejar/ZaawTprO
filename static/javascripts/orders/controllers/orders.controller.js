/**
 * Created by Jarek on 2015-06-09.
 */


(function () {
    'use strict';

    angular.module('application.orders.controllers').controller('OrderController', OrderController);

    OrderController.$inject = ['$scope', 'Order', 'Snackbar', '$cookieStore', 'Utileeer', 'BasketService'];

    function OrderController($scope, Order, Snackbar, $cookieStore, Utileeer, BasketService) {
        var vm = this;
        vm.data = Order.get();
        vm.columns = [];
        vm.submit = submit;


        activate();
        function activate() {

            $scope.$watchCollection(function () {
                return $scope.orders
            }, render);
            $scope.$watch(function () {
                return $(window).width();
            }, render);
            Order.all().then(suc, fail);
        }

        function suc(data) {
            console.log(data.data);
            render(data.data, null);
        }

        function fail(data) {
            console.log('fail');
        }

        function calculateNumberOfColumns() {
            var width = $(window).width();

            if (width >= 1200) {
                return 4;
            } else if (width >= 992) {
                return 3;
            } else if (width >= 768) {
                return 2;
            } else {
                return 1;
            }
        }

        function approximateShortestColumn() {
            var scores = vm.columns.map(columnMapFn);
            return scores.indexOf(Math.min.apply(this, scores));


            function columnMapFn(column) {
                var lengths = column.map(function (element) {
                    return element.state.length;
                });
                return lengths.reduce(sum, 0) * column.length;
            }

            function sum(m, n) {
                return m + n;
            }
        }

        function render(current, original) {
            if (current !== original) {
                vm.columns = [];
                //TODO: poprawi� render ptzy wiecej ni� 4 odrerach

                for (var i = 0; i <= calculateNumberOfColumns(); i++) {
                    vm.columns.push([]);
                }

                for (var i = 0; i < current.length; i++) {
                    var column = approximateShortestColumn();
                    vm.columns[column].push(current[i]);
                }
            }

        }

        function submit() {
            var bas = BasketService.get();

            for (var x = 0; x < bas.length; x++) {
                bas[x].product = bas[x].productId;
            }
            //TODO: poprawi� totalprice
            // reate(shippingAddress, postalCode, city, additional_information, totalprice, state)
            var order = Order.create(vm.shippingAddress, vm.postalCode, vm.city, vm.additional_information, 100/*vm.totalprice*/, 'New', bas).then(
                createOrderSuccessFn
                , createOrderErrorFn);

        }

        function createOrderSuccessFn(data, status, headers, config) {
            console.log(data.data);
            Snackbar.show('Success! Order created.');
            //TODO: dopisa� sleep i redirect na ordersy
            //BasketService.removeAll();
        }


        /**
         * @name createPostErrorFn
         * @desc Propogate error event and show snackbar with error message
         */
        function createOrderErrorFn(data, status, headers, config) {

            console.log(data.data);
            $scope.$broadcast('order.created.error');
            Snackbar.error(data.error);
        }

    }
})();