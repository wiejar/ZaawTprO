/**
 * Created by slawek on 2015-05-10.
 */

(function () {
    'use strict';

    angular.module('application.utils.directives').directive('gallery', GalleryDirective);

    /**
     * @class GalleryLink
     * @description Contain gallery functionality.
     * @param scope {Object} Injected param represent scope of GalleryDirectives.
     */
    function GalleryLink(scope) {
        var vm = scope;
        /**
         * @property current
         * @description Contain index of current selected picture.
         * @default 1
         * @type {number}
         */
        var current = 1;


        vm.current = current;
        vm.previous = previous;
        vm.next = next;
        vm.setCurrent = setCurrent;
        vm.isActive = isActive;

        /**
         * @method next
         * @description Change current value to next.
         */
        function next() {
            vm.current = (vm.current + 1) % vm.photos.length;
        }

        /**
         * @method previous
         * @description Change current value to previous.
         */
        function previous() {
            vm.current = (vm.current - 1 + vm.photos.length) % vm.photos.length;
        }

        /**
         * @method setCurrent
         * @description Change current value to selected as function parameter.
         * @param newCurrent {number} New value of current.
         */
        function setCurrent(newCurrent) {
            vm.current = newCurrent % vm.photos.length;
        }

        /**
         * @method isActive
         * @description Check if selected index is equal to current value.
         * @param index {number} Index to check.
         * @returns {boolean} True if index equal to current;
         */
        function isActive(index) {
            return vm.current === index;
        }
    }

    /**
     * @method GalleryDirective
     * @description Contain definition od gallery directive.
     * @returns {Object}
     */
    function GalleryDirective() {
        var directive = {
            restrict: 'E',
            scope: {
                photos: '='
            },
            link: GalleryLink,
            templateUrl: 'static/templates/utils/gallery.html'
        };

        return directive;
    }
})();