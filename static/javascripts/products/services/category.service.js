/**
 * Created by slawek on 2015-06-05.
 */

(function () {
    'use strict';


    angular.module('application.products.services').factory('CategoryService', CategoryService);

    CategoryService.$inject = ['$http'];

    /**
     * @class CategoryService
     * @description This class manage connection to server for category data.
     * @param $http {Object}  Service used to connect to server.
     */
    function CategoryService($http) {
        var service = {
            getCategories: getCategories
        };

        /**
         * @method getCategories
         * @description Get categories from server
         * @returns {HttpPromise} All categories
         */
        function getCategories() {
            return $http.get('/api/v1/categories/');
        }

        return service;
    }
})();