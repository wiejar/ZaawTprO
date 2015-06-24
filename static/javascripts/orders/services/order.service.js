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
        function create(shippingAddress, postalCode, city, additional_information, totalprice, state){
            return $http.post('/api/v1/orders/', {
                shippingAddress: shippingAddress,
                postalCode: postalCode,
                city: city,
                additional_information: additional_information,
                totalprice: totalprice,
                state: state
            });
        }

        function get(id){
            return $http.get('/api/v1/order/' + id );
        }
    }
})();
