/**
 * Created by slawek on 2015-04-21.
 */


(function () {
    'use strict';

    angular.module('application.profiles.controller')
        .controller('ProfileSettingsController', ProfileSettingsController);

    ProfileSettingsController.$inject = ['$location', '$routeParams', 'Authentication', 'Profile', 'Snackbar'];

    function ProfileSettingsController($location, $routeParams, Authentication, Profile, Snackbar) {
        var vm = this;

        vm.destroy = destroy;
        vm.update = update;

        activate();

        function activate() {
            var authenticatedAccount = Authentication.getAuthenticatedAccount();
            var username = $routeParams.username;

            if (!authenticatedAccount || authenticatedAccount.username != username) {
                //$location.url('/');
                Snackbar.error('You are not authorised to see this page');
            }

            Profile.get(username).then(profileSuccessFn, profileErrorFn);

            function profileSuccessFn(data, status, headers, config) {
                vm.profile = data.data;
                console.log(vm.profile);
            }

            function profileErrorFn(data, status, headers, config) {
                vm.profile = data.data;
                //$location.url('/');
                Snackbar.error('That user does not exist');
            }
        }

        function destroy() {
            Profile.destroy(vm.profile.username)
                .then(profileSuccessFn, profileErrorFn);

            function profileSuccessFn(data, status, headers, config) {
                Authentication.unauthenticated();
                window.location = '/';

                Snackbar.show('Your account has been deleted.');
            }

            function profileErrorFn(data, status, headers, config) {
                Snackbar.error(data.error);
            }
        }

        function update() {
            Profile.update(vm.profile)
                .then(profileSuccessFn, profileErrorFn);

            function profileSuccessFn(data, status, headers, config) {
                Snackbar.show('Your account has been updated.');
            }

            function profileErrorFn(data, status, headers, config) {
                Snackbar.error(data.error);
            }
        }
    }
})();