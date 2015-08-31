/**
 * Created by Jarek on 2015-06-09.
 */

(function () {
    'use strict';

    angular
        .module('application.orders.services')
        .factory('Order', Order);

    Order.$inject = ['$http'];

    function Order($http){
        var Order ={
            all: all,
            create: create,
            allForAdmin: allForAdmin,
            saveNewState: saveNewState
        };

        return Order;

        function all() {
            return $http.get('/api/v1/orders/');
        }

        function allForAdmin() {
            return $http.get('/api/v1/ordersAdmin/');
        }

        function saveNewState(row) {
            return $http.put('/api/v1/ordersAdmin/' + row.id + '/', {
                state: row.state
            });
        }

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
