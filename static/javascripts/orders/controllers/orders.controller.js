/**
 * Created by Jarek on 2015-06-09.
 */

(function() {
    'use strict';

    angular.module('application.orders.controllers').controller('OrderController',OrderController);

    OrderController.$inject = ['$scope'];

    function OrderController($scope){
        var vm = this;
        vm.columns = [];


        activate();
        function activate(){
            console.log("w activate");

            $scope.$watchCollection(function () { return $scope.orders}, render);
            $scope.$watch(function() {return $(window).width();},render);

        }

        function calculateNumberOfColumns(){
            var width = $(window).width();

            if(width >= 1200){
                return 4;
            }else if(width >= 992){
                return 3;
            }else if(width >= 768){
                return 2;
            }else {
                return 1;
            }
        }

        function approximateShortestColumn() {
            var scores = vm.columns.map(columnMapFn);
            return scores.indexOf(Math.min.apply(this, scores));


            function columnMapFn(column) {
                console.log("columnMapFn");
                var lengths = column.map(function (element) {
                    return element.content.length;
                });
                return lengths.reduce(sum, 0) * column.length;
            }

            function sum(m, n) {
                return m + n;
            }
        }

        function render(current, original){
            console.log("render");
            if(current !== original){
                vm.columns = [];

                for(var i= 0;i <calculateNumberOfColumns(); i++){
                    vm.columns.push([]);
                }

                for(var i=0;i<current.length;i++){
                    var column = approximateShortestColumn();
                    vm.columns[column].push(current[i]);
                }
            }

        function countProperty() {
            var width = Math.floor($(window).width() / calculateNumberOfColumns()) + "px";
        }

        }
    }
})();