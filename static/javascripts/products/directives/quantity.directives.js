/**
 * Created by slawek on 2015-06-11.
 */

(function () {
    'use strict';

    angular.module('application.products.directives')
        .directive('quantity', ['$parse', Quantity]);

    /**
     * @method Quantity
     * @description Contain definition od Quantity directive. This directive is attribute. Check if value in model is greater than 1 and less than  available quantity. If available quantity is below 1 this directive disable element.
     * @returns {Object} Definition of directive.
     */
    function Quantity($parse) {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function linkingFn(scope, elm, attrs, ngModelCtrl) {
                attrs.$set('min', '1');
                attrs.$set('max', attrs.quantity);
                if (attrs.quantity < 1) {
                    var modelGetter = $parse(attrs['ngModel']);
                    // This returns a function that lets us set the value of the ng-model binding expression:
                    var modelSetter = modelGetter.assign;
                    // This is how you can use it to set the value 'bar' on the given scope.
                    modelSetter(scope, 0);

                    attrs.$set('disabled', 'disabled');
                }

            }
        }
    }
})();