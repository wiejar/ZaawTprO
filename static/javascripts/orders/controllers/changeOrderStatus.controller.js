/**
 * Created by Jarek on 2015-06-09.
 */


(function () {
    'use strict';

    angular.module('application.orders.controllers').controller('ChangeOrderStatusController', ChangeOrderStatusController);

    ChangeOrderStatusController.$inject = ['Order'];

    function ChangeOrderStatusController(Order) {
        var vm = this;
        vm.data = [];
        vm.next = next;

        activate();
        function activate() {
            Order.allForAdmin().then(suc, fail);
        }

        function suc(data) {
            vm.data = data.data;
        }

        function fail() {
            Snackbar.error('Load orders failure');
        }

        function next(row) {
            Order.saveNewState(row).then(saveSuc, saveFail);
        }

        function saveSuc() {
            activate();
        }

        function saveFail() {
            Snackbar.error('Save new state failure');
        }
    }
})();