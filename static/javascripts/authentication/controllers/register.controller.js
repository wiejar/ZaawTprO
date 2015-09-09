/**
 * Created by slawek on 2015-04-12.
 */

(function(){
    'use strict';

    var ControllersApp = angular.module('application.authentication.controllers');
    ControllersApp.controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$location', 'Authentication'];

    /**
     * @class RegisterController
     * @description Contains all functionalities to register new user.
     * @param $location Injected service which allow go into another page.
     * @param Authentication Injected service contains methods to registrate new user.
     */

    /**
     * @method RegisterController
     * @description Contains information about registrating user.
     */
    function RegisterController($location, Authentication) {
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

        /**
         * @method activate
         * @description Method execute after create controller. Redirects user to chosen url.
         */
        function activate(){
            if(Authentication.isAuthenticated()){
                $location.url('/home');
            }
        }
    }
})();