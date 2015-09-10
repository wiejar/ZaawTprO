/**
 * Created by slawek on 2015-04-21.
 */

(function(){
    'use strict';

    angular.module('application.profiles.services')
        .factory('Profile', Profile);

    Profile.$inject = ['$http'];

    /**
     * @class Profile
     * @description Controller for user's profile.
     * @param $http Injected service which allow to go into another page.
     */

    /**
     * @method Profile
     * @description Contains information possible actions with user's profile.
     * @param $http Injected service which allow to go into another page.
     * @returns {Object} Returns data about possible actions with user's profile.
     */
    function Profile($http){
        var Profile = {
            destroy: destroy,
            get: get,
            update: update
        };

        return Profile;

        /**
         * @method destroy
         * @description Method execute to destroy user's profile. Redirects user to chosen url.
         * @param profile {Object} Instance of the user's profile.
         * @returns {Object} route to go into after destroying profile.
         */
        function destroy(profile){
            return $http.delete('/api/v1/accounts/' + profile.username + '/');
        }

        /**
         * @method get
         * @description Method execute to get user's username.
         * @param username {String} User's username.
         * @returns {Object} route to go into after getting username.
         */
        function get(username){
            return $http.get('/api/v1/accounts/'+username+'/');
        }

        /**
         * @method update
         * @description Method execute to update user's profile.
         * @param profile {Object} Instance of the user's profile.
         * @returns {Object} route to go into after updating profile.
         */
        function update(profile){
            return $http.put('/api/v1/accounts/'+profile.username+'/', profile);
        }
    }
})();