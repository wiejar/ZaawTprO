/**
 * Created by Jarek on 2015-06-24.
 */

(function () {
    'use strict';

    angular
        .module('application.orders.services')
        .factory('ProductOrder', ProductOrder);

    ProductOrder.$inject = ['$http'];

    /**
     * @class ProductOrder
     * @description Allows fetching and creating Products related to Order
     * @param $http {Object}  Service used to connect to server.
     */
    function ProductOrder($http){
        var ProductOrder ={
            all: all,
            create: create,
            get: get
        };

        return ProductOrder;

        /**
         * @method all
         * @description Get all orders
         * @returns {HttpPromise} Data from server
         */
        function all() {
            return $http.get('/api/v1/order/');
        }


        function create(order, product, price, quantity){
            return $http.post('/api/v1/order/', {
                order: order,
                product: product,
                price: price,
                quantity: quantity
            });
        }

       /**
         * @method get
         * @description Get all product orders under selected orderID
         * @param id {Number} Unique number of order
         * @returns {HttpPromise} Data from server
         */
        function get(id){
            return $http.get('/api/v1/orders/' + id  + '/');
        }
    }
})();
