/**
 * Created by slawek on 2015-06-05.
 */

(function () {
    'use strict';

    angular.module('application.utils.services').factory('Utileeer', util);

    function util() {
        var util = {
            isNotEmpty: isNotEmpty
        }

        function isNotEmpty(value) {
            return value !== undefined && value !== null && value;
        }

        return util;
    }
})();