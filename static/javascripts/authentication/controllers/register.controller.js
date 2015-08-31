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

            /**
             * @method register
             * @description Method execute while registrating new user.
             * @param vm.email New user's email.
             * @param vm.password New user's password.
             * @param vm.username New user's username.
             * @param vm.phone_number New user's phone number.
             * @param vm.company_name Company name of new user (optional).
             * @param vm.tax_identification_number Tax identification number of new user (optional)
             */
            function register() {
                Authentication.register(vm.email, vm.password, vm.username, vm.phone_number,
                                        vm.company_name, vm.tax_identification_number);
            }

        function activate(){
            if(Authentication.isAuthenticated()){
                //$location.url('/');
            }
        }
    }
})();