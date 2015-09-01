/**
 * Created by slawek on 2015-04-12.
 */

(function () {
    'use strict';

    var authServiceApp = angular.module('application.authentication.services');
    authServiceApp.factory('Authentication', Authentication);

    Authentication.$inject = ['$cookies', '$http', '$location', '$window', 'Snackbar'];

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
         * @param vm.email New user's email.
         * @param vm.password New user's password.
         * @param vm.username New user's username.
         * @param vm.phone_number New user's phone number.
         * @param vm.company_name Company name of new user (optional).
         * @param vm.tax_identification_number Tax identification number of new user (optional).
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

            function registerSuccess() {
                Authentication.login(email, password);
            }

            function registerFailure() {
                Snackbar.show("Register failure!");
            }
        }

        function login(email, password) {
            return $http.post('/api/v1/auth/login/', {
                email: email,
                password: password
            }).then(loginSuccess, loginFailure);
        }

        function logout() {
            return $http.post('/api/v1/auth/logout/', {}).then(logoutSuccess, logoutFailure);
        }

        function loginSuccess(data) {
            Authentication.setAuthenticatedAccount(data.data);
            //$location.url('/');
            $window.location.reload();
        }

        function loginFailure() {
            Snackbar.error("Authentication failed!");
        }

        function logoutSuccess() {
            Authentication.unauthenticated();
            //$location.url('/');
            $window.location.reload();
        }

        function logoutFailure() {
            Snackbar.error('Logout failure');
        }

        function getAuthenticatedAccount() {
            if (!$cookies.authenticatedAccount) {
                return;
            }

            return JSON.parse($cookies.authenticatedAccount);
        }

        function isAuthenticated() {
            return !!$cookies.authenticatedAccount;
        }

        function setAuthenticatedAccount(account) {
            $cookies.authenticatedAccount = JSON.stringify(account);
        }

        function unauthenticated() {
            delete $cookies.authenticatedAccount;
        }
    }
})();