/**
 * Created by Jarek on 2015-06-24.
 */


(function () {
    'use strict';

    angular.module('application.orders.controllers').controller('ProductOrderController', ProductOrderController);

    ProductOrderController.$inject = ['$scope', '$routeParams', 'ProductOrder', 'ProductService'];

    function ProductOrderController($scope, $routeParams, ProductOrder, ProductService) {
        var vm = this;
        vm.productOrderItems = [];
        vm.dict = {};

        activate();
        function activate() {
            var id = $routeParams.id;
            ProductOrder.get(id).then(suc, fail);
        }

        function suc(data) {
            render(data.data, null);
        }

        function fail() {
            Snackbar.error('Get information about product failed');
        }

        function render(current) {
            vm.dict["id"] = current.id;
            vm.dict["state"] = current.state;
            vm.dict["shippingAddress"] = current.shippingAddress;
            vm.dict["postalCode"] = current.postalCode;
            vm.dict["city"] = current.city;
            vm.dict["additional_information"] = current.additional_information;
            vm.dict["totalprice"] = current.totalprice;
            vm.dict["created_at"] = current.created_at;
            vm.dict["last_change"] = current.last_change;

            asyncLoop(current.productOrder.length, function (loop) {
                    getProductInfo(current.productOrder[loop.iteration()], function (result) {
                        // Okay, for cycle could continue
                        loop.next();
                    })
                },
                function () {
                }
            );
        }

        function getProductInfo(a, callback) {
            ProductService.getSimpleProduct(a.product).then(function (val) {
                a.product = val.data;
                vm.productOrderItems.push(a);
            });
            callback();
        }

        function asyncLoop(iterations, func, callback) {
            var index = 0;
            var done = false;
            var loop = {
                next: function () {
                    if (done) {
                        return;
                    }

                    if (index < iterations) {
                        index++;
                        func(loop);

                    } else {
                        done = true;
                        callback();
                    }
                },

                iteration: function () {
                    return index - 1;
                },

                break: function () {
                    done = true;
                    callback();
                }
            };
            loop.next();
            return loop;
        }
    }
})
();

