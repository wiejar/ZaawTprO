/**
 * Created by slawek on 2015-05-02.
 */

(function () {
    'use strict';

    angular.module('application.products',
        ['application.products.controllers', 'application.products.directives', 'application.products.services']);

    angular.module('application.products.directives', ['ngDialog']);
    angular.module('application.products.controllers', []);
    angular.module('application.products.services', []);
})();