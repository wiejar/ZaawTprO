/**
 * Created by Jarek on 2015-06-09.
 */


(function () {
    'use strict';

    angular.module('application.orders.controllers').controller('OrderController', OrderController);

    OrderController.$inject = ['$scope', 'Order', 'Snackbar', 'BasketService'];


    /**
     * @class OrderController
     * @description Contains all functionality available on orders page.
     * @param $scope
     * @param Order Injected service which allow handle orders.
     * @param Snackbar Injected service which allows to show snackbar messages in browser
     * @param BasketService Injected service which allow add product into basket.
     */
    function OrderController($scope, Order, Snackbar, BasketService) {
        var vm = this;
         /**
         * @properties data
         * @description All orders
         * @type {Object}
         */
        vm.data = [];
        /**
         * @properties columns
         * @description single columns
         * @type {Object}
         */
        vm.columns = [];
        vm.submit = submit;

        activate();
        /**
         * @method activate
         * @description Method execute after create controller. Download data about selected product.
         */
        function activate() {

            $scope.$watchCollection(function () {
                return $scope.orders
            }, simpleRender);
            $scope.$watch(function () {
                return $(window).width();
            }, simpleRender);
            Order.all().then(suc, fail);
        }


        function simpleRender() {
            render(vm.data, null);
        }

        function suc(data) {
            vm.data = data.data;
            render(data.data, null);
        }

        /**
         * @method fail
         * @description In case of error proper message is visible in browser
         */
        function fail() {
            Snackbar.error('Fail downloaded orders!');
        }

        /**
         * @method calculateNumberOfColumns
         * @description Calculate number of columns based on browser width.
         * @return {Number} amount of columns
         */
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

        /**
         * @method approximateShortestColumn
         * @description Calculate shortest column.
         * @return {Number} shortest column ID
         */
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

        /**
         * @method render
         * @description Renders orders for browser view.
         * @param current contains order objects.
         * @param original contains new view order objects
         */
        function render(current, original) {
            if (current !== original) {
                vm.columns = [];

                for (var i = 0; i < calculateNumberOfColumns(); i++) {
                    vm.columns.push([]);
                }

                for (var i = 0; i < current.length; i++) {
                    var column = approximateShortestColumn();
                    vm.columns[column].push(current[i]);
                }
            }

        }

        /**
         * @method submit
         * @description Creates new order
         */
        function submit() {
            var bas = BasketService.get();
            var sum = 0;
            for (var x = 0; x < bas.length; x++) {
                bas[x].product = bas[x].productId;
                sum += bas[x].price * bas[x].quantity;
            }
            var order = Order.create(vm.shippingAddress, vm.postalCode, vm.city, vm.additional_information, sum, 'New', bas).then(
                createOrderSuccessFn
                , createOrderErrorFn);

        }

        /**
         * @method createOrderSuccessFn
         * @description Creates new order success message
         */
        function createOrderSuccessFn() {
            Snackbar.show('Success! Order created.');
            //TODO: dopisa� sleep i redirect na ordersy
            BasketService.removeAll();
        }


        /**
         * @name createPostErrorFn
         * @desc Propogate error event and show snackbar with error message
         */
        function createOrderErrorFn(data) {
            $scope.$broadcast('order.created.error');
            Snackbar.error(data.error);
        }

    }
})();