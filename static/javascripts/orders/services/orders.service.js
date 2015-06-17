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
            get: get
        };

        return Order;

        function all() {
            return $http.get('/api/v1/order/');
        }

        function create(content){
            return $http.post('/api/v1/order/',{
                content: content
            });
        }

        function get(username){
            return $http.get('/api/v1/accounts/'+username+'/order/');
        }
    }
})();
