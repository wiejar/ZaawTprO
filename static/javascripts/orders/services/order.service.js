/**
 * Created by Jarek on 2015-06-24.
 */

(function () {
    'use strict';

    angular
        .module('application.orders.services')
        .factory('ProductOrder', ProductOrder);

    ProductOrder.$inject = ['$http'];

    function ProductOrder($http){
        var ProductOrder ={
            all: all,
            create: create,
            get: get
        };

        return ProductOrder;

        function all() {
            return $http.get('/api/v1/order/');
        }

        //TODO:zmienic na dobre parametry
        function create(order, product, price, quantity){
            return $http.post('/api/v1/order/', {
                order: order,
                product: product,
                price: price,
                quantity: quantity
            });
        }

        function get(id){
            return $http.get('/api/v1/orders/' + id  + '/');
        }
    }
})();
