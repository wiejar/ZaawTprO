/**
 * Created by slawek on 2015-06-05.
 */

(function () {
    'use strict';

    angular.module('application.utils.services').factory('Utileeer', UtilService);

    /**
     * @class UtilService
     * @description This class has util method for system.
     */
    function UtilService() {
        var utilService = {
            isNotEmpty: isNotEmpty
        };

        /**
         * @method isNotEmpty
         * @description Check if passed Object has some value.
         * @param {Object} value Object to check.
         * @returns {Boolean} Return true if value is not empty.
         */
        function isNotEmpty(value) {
            return value !== undefined && value !== null && value;
        }

        return utilService;
    }
})();