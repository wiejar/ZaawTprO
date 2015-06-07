/**
 * Created by slawek on 2015-06-05.
 */

(function () {
    'use strict';

    angular.module('application.layout.controllers').controller('LeftMenuController', LeftMenuController);

    LeftMenuController.$inject = ['$scope', 'CategoryService', '$location']

    function LeftMenuController($scope, CategoryService, $location) {
        var vm = this;
        vm.result = {};
        vm.isActive = isActive;

        function isActive(path) {
            var c = path === $location.path();
            return c;
        }

        activate()

        function activate() {
            CategoryService.getCategories().then(loadCategoriesSuccess, loadCategoriesFailure);
        }

        function loadCategoriesSuccess(data, status, headers, config) {

            vm.result = data;
        }

        function loadCategoriesFailure(data, status, headers, config) {
            console.log(data.data);
            vm.result = data;
        }
    }
})();