/**
 * Created by slawek on 2015-06-05.
 */

(function () {
    'use strict';

    angular.module('application.layout.controllers').controller('LeftMenuController', LeftMenuController);

    LeftMenuController.$inject = ['CategoryService', '$location']

    function LeftMenuController(CategoryService, $location) {
        var vm = this;
        /**
         * @property result
         * @description Categories which should be showed on the page.
         * @type {Object}
         */
        vm.result = {};
        vm.isActive = isActive;

        /**
         * @method isActive
         * @description Check if passed path is current path.
         * @param path {String} Path to check.
         * @return {Boolean} True if passed path is current url otherwise false.
         */
        function isActive(path) {
            return path === $location.path();
        }

        activate();

        /**
         * @method activate
         * @description Method execute after create controller. Download categories.
         */
        function activate() {
            CategoryService.getCategories().then(loadCategoriesSuccess, loadCategoriesFailure);
        }

        /**
         * @method loadCategoriesSuccess
         * @description Action invoked after success download data from server, save data in controller.
         * @param data {Object} Downloaded data
         */
        function loadCategoriesSuccess(data) {
            vm.result = data;
        }

        /**
         * @method loadCategoriesFailure
         * @description Action invoked after failed download data from server, show information about fail.
         */
        function loadCategoriesFailure() {
            Snackbar.error('Load categories failure');
        }
    }
})();