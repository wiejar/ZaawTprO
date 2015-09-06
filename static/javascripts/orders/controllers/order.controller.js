/**
 * Created by Jarek on 2015-06-24.
 */


(function () {
    'use strict';

    angular.module('application.orders.controllers').controller('ProductOrderController', ProductOrderController);

    ProductOrderController.$inject = ['$scope', '$routeParams', 'ProductOrder', 'ProductService'];

    /**
     * @class ProductOrderController
     * @description Contains all functionality available on orders page.
     * @param $routeParams Injected service which allow get data from url.
     * @param ProductOrder Injected service which allow add product into basket.
     * @param ProductService Injected service which allow download data about products.
     */
    function ProductOrderController($routeParams, ProductOrder, ProductService) {
        var vm = this;
        /**
         * @properties productOrderItems
         * @description All products related to order
         * @type {Object}
         */
        vm.productOrderItems = [];
        /**
         * @properties dict
         * @description Fields of productOrder
         * @type {Object}
         */
        vm.dict = {};

        activate();
        /**
         * @method activate
         * @description Method execute after create controller. Download data about selected product.
         */
        function activate() {
            var id = $routeParams.id;
            ProductOrder.get(id).then(suc, fail);
        }

        function suc(data) {
            render(data.data, null);
        }

        /**
         * @method fail
         * @description In case of error proper message is visible in browser
         */
        function fail() {
            Snackbar.error('Get information about product failed');
        }

        /**
         * @method render
         * @description Renders order details
         * @param current Single order data.
         */
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

        /**
         * @method getProductInfo
         * @description Go to product page.
         * @param a {Object} Order, which should be showed.
         * @param callback callback request
         */
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

