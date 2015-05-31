/**
 * Created by slawek on 2015-05-02.
 */

(function () {
    'use strict';

    angular.module('application.products.services').factory('ProductService', ProductService);

    ProductService.$inject = ['$http'];

    function ProductService($http) {
        var service = {
            getByCategory: getByCategory,
            getProduct: getProduct
        };

        function getByCategory(category) {
            var queryEnd = '';
            if (category != null)
                queryEnd = category + '/category/';
            return $http.get('/api/v1/category/' + queryEnd);
        }

        function getProduct(uniqueName) {
            return $http.get('/api/v1/product/' + uniqueName + '/');
        }

        return service;
    }


})();