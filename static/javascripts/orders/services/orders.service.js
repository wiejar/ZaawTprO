/**
 * Created by Jarek on 2015-06-09.
 */

(function () {
    'use strict';

    angular
        .module('application.orders.services')
        .factory('Order', Order);

    Order.$inject = ['$http'];


    /**
     * @class Order
     * @description Allows fetching and creating orders
     * @param $http {Object}  Service used to connect to server.
     */
    function Order($http){
        var Order ={
            all: all,
            create: create,
            allForAdmin: allForAdmin,
            saveNewState: saveNewState
        };

        return Order;

        /**
         * @method all
         * @description Get all orders
         * @returns {HttpPromise} Data from server
         */
        function all() {
            return $http.get('/api/v1/orders/');
        }

       /**
         * @method allForAdmin
         * @description Get all orders for admin
         * @returns {HttpPromise} Data from server
         */
        function allForAdmin() {
            return $http.get('/api/v1/ordersAdmin/');
        }

         /**
         * @method saveNewState
         * @description allows admin to update order state
         * @param row {Number} Unique number of order
         */
        function saveNewState(row) {
            return $http.put('/api/v1/ordersAdmin/' + row.id + '/', {
                state: row.state
            });
        }

        /**
         * @method create
         * @description creates new order
         * @param shippingAddress {String} Unique number of order
         * @param postalCode {String} Unique number of order
         * @param city {String} Unique number of order
         * @param additional_information {String} Unique number of order
         * @param totalprice {Number} Unique number of order
         * @param state {State} Unique number of order
         * @param productOrder {Product} Unique number of order
         * @returns {HttpPromise} Data from server
         */
        function create(shippingAddress, postalCode, city, additional_information, totalprice, state, productOrder) {
            return $http.post('/api/v1/orders/', {
                shippingAddress: shippingAddress,
                postalCode: postalCode,
                city: city,
                additional_information: additional_information,
                totalprice: totalprice,
                state: state,
                productOrder: productOrder
            });
        }
    }
})();
