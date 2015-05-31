/**
 * Created by slawek on 2015-05-10.
 */

(function () {
    'use strict';

    angular.module('application.utils.directives').directive('gallery', gallery);

    function link(scope) {
        var vm = scope;
        var current = 1;

        vm.current = current;
        vm.previous = previous;
        vm.next = next;
        vm.setCurrent = setCurrent;
        vm.isActive = isActive;


        function next() {
            vm.current = (vm.current + 1) % vm.photos.length;
        }

        function previous() {
            vm.current = (vm.current - 1 + vm.photos.length) % vm.photos.length;
        }

        function setCurrent(newCurrent) {
            vm.current = newCurrent % vm.photos.length;
        }

        function isActive(index) {
            return vm.current === index;
        }
    }

    function gallery() {
        var directive = {
            restrict: 'E',
            scope: {
                photos: '='
            },
            link: link,
            templateUrl: 'static/templates/utils/gallery.html'
        };

        return directive;
    }
})();