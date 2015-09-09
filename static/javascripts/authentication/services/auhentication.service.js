/**
 * Created by slawek on 2015-04-12.
 */

(function () {
    'use strict';

    var authServiceApp = angular.module('application.authentication.services');
    authServiceApp.factory('Authentication', Authentication);

    Authentication.$inject = ['$cookies', '$http', '$location', '$window', 'Snackbar'];

    /**
     * @class Authentication
     * @description Contains all functionalities to authenticate user.
     * @param $cookies Injected service which manages cookies for the browser.
     * @param $http Injected service that facilitates communication with the remote HTTP servers.
     * @param $location Injected service parses the URL in the browser address bar.
     * @param $window Injected service - a reference to the browser's window object.
     * @param Snackbar {Object} Injected object to highliht informations for user.
     */

    /**
     * @method Authentication
     * @description Method execute while creating new user.
     * @param $cookies Injected service which manages cookies for the browser.
     * @param $http Injected service that facilitates communication with the remote HTTP servers.
     * @param $location Injected service parses the URL in the browser address bar.
     * @param $window Injected service - a reference to the browser's window object.
     * @param Snackbar {Object} Injected object to highliht informations for user.
     * @returns Authentication {Object} Return data about authentication.
     */
    function Authentication($cookies, $http, $location, $window, Snackbar) {
        var Authentication = {
            register: register,
            login: login,
            logout: logout,
            getAuthenticatedAccount: getAuthenticatedAccount,
            isAuthenticated: isAuthenticated,
            setAuthenticatedAccount: setAuthenticatedAccount,
            unauthenticated: unauthenticated
        };

        return Authentication;
        /**
         * @method register
         * @description Method execute while registrating new user.
         */
        function register(email, password, username, phone_number, company_name, tax_identification_number) {
            return $http.post('/api/v1/accounts/', {
                username: username,
                password: password,
                email: email,
                phone_number: phone_number,
                company_name: company_name,
                tax_identification_number: tax_identification_number
            }).then(registerSuccess, registerFailure);

            /**
             * @method registerSuccess
             * @description Method execute while registration is successful.
             * @param data {Object} Data about user.
             * @param status {Object} User's status.
             * @param headers {Object}
             * @param config {Object} Account configuration
             */
            function registerSuccess() {
                Authentication.login(email, password);
            }

            /**
             * @method registerFailure
             * @description Method execute while registration is failed.
             * @param data {Object} Data about user.
             * @param status {Object} User's status.
             * @param headers {Object}
             * @param config {Object} Account configuration.
             */
            function registerFailure() {
                Snackbar.show("Register failure!");
            }
        }

        /**
         * @method login
         * @description Method execute while users logs in.
         * @param email {String} User's email.
         * @param password {Object} User's password.
         * @returns {Object} Returns redirection route.
         */
        function login(email, password) {
            return $http.post('/api/v1/auth/login/', {
                email: email,
                password: password
            }).then(loginSuccess, loginFailure);
        }

        /**
         * @method logout
         * @description Method execute while users logs out.
         * @returns {Object} Returns redirection route.
         */
        function logout() {
            return $http.post('/api/v1/auth/logout/', {}).then(logoutSuccess, logoutFailure);
        }

        /**
         * @method loginSuccess
         * @description Method execute while logging in is successful.
         * @param data {Object} Data about user.
         */
        function loginSuccess(data) {
            Authentication.setAuthenticatedAccount(data.data);
            $location.url('/home');
            $window.location.reload();
        }

        /**
         * @method loginFailure
         * @description Method execute while logging in is failed.
         */
        function loginFailure() {
            Snackbar.error("Authentication failed!");
        }

         /**
         * @method logoutSuccess
         * @description Method execute while logging out is successful.
         */
        function logoutSuccess() {
            Authentication.unauthenticated();
            //$location.url('/');
            $window.location.reload();
        }

        /**
         * @method logoutFailure
         * @description Method execute while logging out is failed.
         */
        function logoutFailure() {
            Snackbar.error('Logout failure');
        }

        /**
         * @method getAuthenticatedAccount
         * @description This method gives data about authenticated account.
         * @returns {Object} Returns information that the account is authenticated.
         */
        function getAuthenticatedAccount() {
            if (!$cookies.authenticatedAccount) {
                return;
            }

            return JSON.parse($cookies.authenticatedAccount);
        }

        /**
         * @method isAuthenticated
         * @description This method gives information whether user is already authenticated.
         * @returns {Object} Returns information that the account is authenticated.
         */
        function isAuthenticated() {
            return !!$cookies.authenticatedAccount;
        }

        /**
         * @method setAuthenticatedAccount
         * @description This method sets the account to be authenticated.
         * @param account {Object} Account which is going to be set as an authenticated.
         */
        function setAuthenticatedAccount(account) {
            $cookies.authenticatedAccount = JSON.stringify(account);
        }

        /**
         * @method unauthenticated
         * @description This method sets the account to be unauthenticated.
         */
        function unauthenticated() {
            delete $cookies.authenticatedAccount;
        }
    }
})();