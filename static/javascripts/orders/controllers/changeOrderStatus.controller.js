/**
 * Created by Jarek on 2015-06-09.
 */


(function () {
    'use strict';

    angular.module('application.orders.controllers').controller('ChangeOrderStatusController', ChangeOrderStatusController);

    ChangeOrderStatusController.$inject = ['Order'];

    /**
     * @class ChangeOrderStatusController
     * @description Contains all functionality available on products page.
     * @param Order Injected service which allow modify order data
     */
    function ChangeOrderStatusController(Order) {
        var vm = this;
        /**
         * @property quantity
         * @description number of product which user want buy.
         * @type {number}
         */
        vm.data = [];
        vm.next = next;

        activate();
        /**
         * @method activate
         * @description Method execute after create controller. Download data about orders for admin.
         */
        function activate() {
            Order.allForAdmin().then(suc, fail);
        }

        /**
         * @method suc
         * @description After successfully orders fetch put them to data table.
         * @param data all orders for admin view
         */
        function suc(data) {
            vm.data = data.data;
        }

        /**
         * @method fail
         * @description In case of error during fetching orders proper message is visible in browser
         */
        function fail() {
            Snackbar.error('Load orders failure');
        }

        /**
         * @method next
         * @description After successfully order save call activate method
         * @param {Object} row single order to save
         */
        function next(row) {
            Order.saveNewState(row).then(saveSuc, saveFail);
        }

        /**
         * @method saveFail
         * @description After successfully order save call activate method
         */
        function saveSuc() {
            activate();
        }

        /**
         * @method saveFail
         * @description In case of error during saving order proper message is visible in browser
         */
        function saveFail() {
            Snackbar.error('Save new state failure');
        }
    }
})();