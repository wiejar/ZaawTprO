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

        function create(content){
            return $http.post('/api/v1/order/', {
                content: content
            });
        }

        function get(id){
            return $http.get('/api/v1/order/' + id );
        }
    }
})();
