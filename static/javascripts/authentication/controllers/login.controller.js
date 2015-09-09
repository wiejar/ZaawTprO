/**
 * Created by slawek on 2015-04-12.
 */

(function(){
    'use strict';

    angular.module('application.authentication.controllers').controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'Authentication'];

    /**
     * @class LoginController
     * @description Contains all functionalities to log in user.
     * @param $location Injected service which allow go into another page.
     * @param Authentication {Object} Injected service contains methods to login user.
     */

    /**
     * @method LoginController
     * @description Contains information about logging user.
     */
    function LoginController($location, Authentication) {
        var vm = this;

        vm.login = login;

        activate();

        /**
         * @method activate
         * @description Method execute after create controller. Redirects user to chosen url.
         */
        function activate() {
            if(Authentication.isAuthenticated()){
                $location.url('/home');
            }
        }

        /**
         * @method login
         * @description Method execute while user logs in.
         */
        function login(){
            Authentication.login(vm.email, vm.password);
        }
    }
})();