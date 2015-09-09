/**
 * Created by slawek on 2015-05-02.
 */

(function () {
    'use strict';

    angular.module('application.products.services').factory('ProductService', ProductService);

    ProductService.$inject = ['$http'];

    /**
     * @class ProductService
     * @description This class manage connection to server for product data.
     * @param $http {Object}  Service used to connect to server.
     */
    function ProductService($http) {
        var service = {
            getByCategory: getByCategory,
            getProduct: getProduct,
            getSimpleProduct: getSimpleProduct,
            updateProduct: updateProduct
        };

        /**
         * @method getByCategory
         * @description Get products by category from server
         * @param category {String} Category name
         * @returns {HttpPromise} All products in category
         */
        function getByCategory(category) {
            var queryEnd = '';
            if (category != null)
                queryEnd = category + '/category/';
            return $http.get('/api/v1/category/' + queryEnd);
        }

        /**
         * @method getProduct
         * @description Get from server full information about product from server
         * @param uniqueName {String} Unique Name of product
         * @returns {HttpPromise} Data from server
         */
        function getProduct(uniqueName) {
            return $http.get('/api/v1/product/' + uniqueName + '/');
        }

        /**
         * @method getSimpleProduct
         * @description Get from server basic information about product
         * @param id {number} Id of product
         * @returns {HttpPromise} Data from server
         */
        function getSimpleProduct(id) {
            return $http.get('/api/v1/simpleProduct/' + id + '/');
        }

        function updateProduct(product){
            console.log("PR z PR SER");
            console.log(product);
            return $http.put('/api/v1/simpleProduct/'+product.id + '/', product);
        }

        return service;
    }


})();