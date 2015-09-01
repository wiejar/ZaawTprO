/**
 * Created by slawek on 2015-06-05.
 */

(function () {
    'use strict';

    angular.module('application.layout.controllers').controller('LeftMenuController', LeftMenuController);

    LeftMenuController.$inject = ['CategoryService', '$location']

    function LeftMenuController(CategoryService, $location) {
        var vm = this;
        vm.result = {};
        vm.isActive = isActive;

        function isActive(path) {
            return path === $location.path();
        }

        activate();

        function activate() {
            CategoryService.getCategories().then(loadCategoriesSuccess, loadCategoriesFailure);
        }

        function loadCategoriesSuccess(data) {
            vm.result = data;
        }

        function loadCategoriesFailure() {
            Snackbar.error('Load categories failure');
        }
    }
})();