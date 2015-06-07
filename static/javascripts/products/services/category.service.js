/**
 * Created by slawek on 2015-06-05.
 */

(function () {
    'use strict';


    angular.module('application.products.services').factory('CategoryService', CategoryService);

    CategoryService.$inject = ['$http'];

    function CategoryService($http) {
        var service = {
            getCategories: getCategories
        }

        function getCategories() {
            return $http.get('/api/v1/categories/');
        }

        return service;
    }
})();