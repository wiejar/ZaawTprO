/**
 * Created by Jarek on 2015-06-24.
 */


(function() {
    'use strict';

    angular.module('application.orders.controllers').controller('ProductOrderController',ProductOrderController);

    ProductOrderController.$inject = ['$scope', '$routeParams', 'ProductOrder'];

    function ProductOrderController($scope, $routeParams, ProductOrder) {
        var vm = this;
        vm.rows = [];


        activate();
        function activate(){
            var id = $routeParams.id;
            $scope.$watchCollection(function () { return $scope.prOrder}, render);
            $scope.$watch(function() {return $(window).width();},render);
            ProductOrder.all().then(suc, fail);
        }

        function suc(data) {
            //console.log(data.data);
            render(data.data, null);
        }

        function fail(data) {
            console.log('fail');
        }


        function render(current, original){
            if(current !== original){

                vm.rows = [];
                for(var i= 0;i <=current.length-1; i++){
                    vm.rows.push(current[i]);
                }
                //for(var i=0;i<current.length;i++){
                //    vm.columns[i].push(current[i]);
                //}
            }
           // console.log(JSON.stringify(vm.rows))
        }
    }
})();

