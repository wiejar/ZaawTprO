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

        function fail(data) {
            console.log(data);
        }

        function next(row) {
            Order.saveNewState(row).then(suca, fail);
        }

        function suca(data) {
            activate();
        }
    }
})();