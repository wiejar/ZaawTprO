/**
 * Created by Jarek on 2015-06-09.
 */

(function () {
    'use strict';

    angular
        .module('application.order.services')
        .factory('Orders', Orders);

    Posts.$inject = ['$http'];

    function Orders($http){
        var Orders ={
            all: all,
            create: create,
            get: get
        };

        return Orders;

        function all() {
            return $http.get('/api/v1/orders/');
        }

        function create(content){
            return $http.post('/api/v1/orders/',{
                content: content
            });
        }

        function get(username){
            return $http.get('/api/v1/accounts/'+username+'/orders/');
        }
    }
})();
