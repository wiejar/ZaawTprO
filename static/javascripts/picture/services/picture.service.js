/**
 * Created by slawek on 2015-05-17.
 */


(function () {
    'use strict';
    angular.module('application.picture.services').factory('Picture', Picture);

    Picture.$inject = ['$http'];

    function Picture($http) {
        var Picture = {
            get: get
        };

        function get(id) {
            return $http.get('/api/v1/picture/' + id + '/');
        }

        return Picture;
    }
})();