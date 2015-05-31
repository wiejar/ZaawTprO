/**
 * Created by slawek on 2015-04-12.
 */

(function(){
    'use strict';

    var ControllersApp = angular.module('application.authentication.controllers');
    ControllersApp.controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$location', '$scope', 'Authentication'];

    function RegisterController($location, $scope, Authentication){
        var vm = this;
        vm.register = register;

        activate();

        function register(){
            Authentication.register(vm.email,vm.password, vm.username);
        }

        function activate(){
            if(Authentication.isAuthenticated()){
                //$location.url('/');
            }
        }
    }
})();