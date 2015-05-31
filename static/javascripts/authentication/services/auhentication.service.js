/**
 * Created by slawek on 2015-04-12.
 */

(function () {
    'use strict';

    var authServiceApp = angular.module('application.authentication.services');
    authServiceApp.factory('Authentication', Authentication);

    Authentication.$inject = ['$cookies', '$http', '$location', '$window'];

    function Authentication($cookies, $http, $location, $window) {
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

        function register(email, password, username) {
            return $http.post('/api/v1/accounts/', {
                username: username,
                password: password,
                email: email
            }).then(registerSuccess, registerFailure);

            function registerSuccess(data, status, headers, config) {
                Authentication.login(email, password);
            }

            function registerFailure(data, status, headers, config) {
                console.error('Epic failure!');
            }
        };

        function login(email, password) {
            return $http.post('/api/v1/auth/login/', {
                email: email,
                password: password
            }).then(loginSuccess, loginFailure);
        };

        function logout() {
            return $http.post('/api/v1/auth/logout/', {}).then(logoutSuccess, logoutFailure);
        }

        function loginSuccess(data, status, headers, config) {
            Authentication.setAuthenticatedAccount(data.data);
            //$location.url('/');
            $window.location.reload();
        }

        function loginFailure(data, status, headers, config) {
            console.error('Epic failure!');
            console.error(data.data);
        }

        function logoutSuccess(data, status, headers, config) {
            Authentication.unauthenticated();
            //$location.url('/');
            $window.location.reload();
        }

        function logoutFailure(data, status, headers, config) {
            console.error('Epic failure!');
        }

        function getAuthenticatedAccount() {
            if (!$cookies.authenticatedAccount) {
                return;
            }

            return JSON.parse($cookies.authenticatedAccount);
        };

        function isAuthenticated() {
            return !!$cookies.authenticatedAccount;
        };

        function setAuthenticatedAccount(account) {
            $cookies.authenticatedAccount = JSON.stringify(account);
        };

        function unauthenticated() {
            delete $cookies.authenticatedAccount;
        }
    };
})();