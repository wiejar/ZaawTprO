/**
 * Created by slawek on 2015-04-13.
 */

(function() {
    'use strict';

    angular.module('application.layout.controllers')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['Authentication'];

    /**
     * @class NavbarController
     * @description Contains all functionality available on header of page.
     * @param Authentication Injected service which allow logout user from application.
     */
    function NavbarController(Authentication) {
        var vm = this;

        vm.logout = logout;

        /**
         * @method logout
         * @description Logout user from application.
         */
        function logout(){
            Authentication.logout();
        }
    }
})();