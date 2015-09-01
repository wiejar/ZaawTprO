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
                Snackbar.error('You are not authorised to see this page');
                //$location.url('/');
            }

            Profile.get(username).then(profileSuccessFn, profileErrorFn);

            function profileSuccessFn(data) {
                vm.profile = data.data;
            }

            function profileErrorFn(data) {
                vm.profile = data.data;
                Snackbar.error('That user does not exist');
                //$location.url('/');
            }
        }

        function destroy() {
            Profile.destroy(vm.profile.username)
                .then(profileSuccessFn, profileErrorFn);

            function profileSuccessFn() {
                Authentication.unauthenticated();
                window.location = '/';

                Snackbar.show('Your account has been deleted.');
            }

            function profileErrorFn(data) {
                Snackbar.error(data.error);
            }
        }

        function update() {
            Profile.update(vm.profile)
                .then(profileSuccessFn, profileErrorFn);

            function profileSuccessFn() {
                Snackbar.show('Your account has been updated.');
            }

            function profileErrorFn(data) {
                Snackbar.error(data.error);
            }
        }
    }
})();