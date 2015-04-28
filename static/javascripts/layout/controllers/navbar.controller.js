/**
 * Created by slawek on 2015-04-13.
 */

(function() {
    'use strict';

    angular.module('application.layout.controllers')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$scope','Authentication'];

    function NavbarController($scope, Authentication){
        var vm = this;

        vm.logout = logout;

        function logout(){
            Authentication.logout();
        }
    }
})();