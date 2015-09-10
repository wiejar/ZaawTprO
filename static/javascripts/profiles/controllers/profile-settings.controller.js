/**
 * Created by slawek on 2015-04-21.
 */


(function () {
    'use strict';

    angular.module('application.profiles.controller')
        .controller('ProfileSettingsController', ProfileSettingsController);

    ProfileSettingsController.$inject = ['$location', '$routeParams', 'Authentication', 'Profile', 'Snackbar'];

    /**
     * @class ProfileSettingsController
     * @description Controller for user's settings.
     * @param $location Injected service which allow go into another page.
     * @param $routeParams Injected service with data about routes parametres.
     * @param Authentication {Object} Injected service contains methods to registrate new user.
     * @param Profile {Object} Injected service with user's profile data.
     * @param Snackbar {Object} Injected service with informations for user.
     */
    function ProfileSettingsController($location, $routeParams, Authentication, Profile, Snackbar) {
        var vm = this;

        /**
         * @method ProfileSettingsController
         * @description Contains information about user's profile settings.
         */
        vm.destroy = destroy;
        vm.update = update;

        activate();

        /**
         * @method activate
         * @description Method execute after create controller. Redirects user to chosen url.
         */
        function activate() {
            var authenticatedAccount = Authentication.getAuthenticatedAccount();
            var username = $routeParams.username;

            if (!authenticatedAccount || authenticatedAccount.username != username) {
                Snackbar.error('You are not authorised to see this page');
                $location.url('/home');
            }

            Profile.get(username).then(profileSuccessFn, profileErrorFn);

            /**
             * @method profileSuccessFn
             * @description Method execute when profile is correct.
             */
            function profileSuccessFn(data) {
                vm.profile = data.data;
            }

            /**
             * @method profileErrorFn
             * @description Method execute when profile is incorrect. Redirects user to chosen url.
             */
            function profileErrorFn(data) {
                vm.profile = data.data;
                Snackbar.error('That user does not exist');
                $location.url('/home');
            }
        }

        /**
         * @method destroy
         * @description Method execute to destroy user's profile. Redirects user to chosen url.
         */
        function destroy() {
            Profile.destroy(vm.profile)
                .then(profileSuccessFn, profileErrorFn);

            /**
             * @method profileSuccessFn
             * @description Method execute when profile is correct.
             */
            function profileSuccessFn() {
                Authentication.unauthenticated();
                window.location = '/';

                Snackbar.show('Your account has been deleted.');
            }

            /**
             * @method profileErrorFn
             * @description Method execute when profile is incorrect.
             * @param data {Object} User's account data.
             */
            function profileErrorFn(data) {
                Snackbar.error(data.error);
            }
        }

        /**
         * @method update
         * @description Method execute to update user's profile.
         */
        function update() {
            Profile.update(vm.profile)
                .then(profileSuccessFn, profileErrorFn);

            /**
             * @method profileSuccessFn
             * @description Method execute when profile is correct.
             */
            function profileSuccessFn() {
                Snackbar.show('Your account has been updated.');
            }

            /**
             * @method profileErrorFn
             * @description Method execute when profile is incorrect.
             * @param data {Object} User's account data.
             */
            function profileErrorFn(data) {
                Snackbar.error(data.error);
            }
        }
    }
})();