(function($,_){
    'use strict';

    angular.module('application.utils.services').factory('Snackbar', Snackbar);


    /**
     * @class SnackbarService
     * @description This class crate snackbar view with information.
     */
    function Snackbar(){
        var SnackBar = {
            error: error,
            show: show
        };

        return SnackBar;

        /**
         * @method _snackbar
         * @description Main method which create snackbar.
         * @param content {String} Content of snackbar information.
         * @param options {Object} Options of snackbar.
         */
        function _snackbar(content, options){
            options = _.extend({timeout: 3000}, options);
            options.content = content;

            $.snackbar(options);
        }

        /**
         * @method error
         * @description Method which create snackbar, when the error is detected.
         * @param content {String} Content of snackbar information.
         * @param options {Object} Options of snackbar.
         */
        function error(content, options){
            _snackbar('Error: ' + content, options);
        }

        /**
         * @method show
         * @description Method which create snackbar for positive information.
         * @param content {String} Content of snackbar information.
         * @param options {Object} Options of snackbar.
         */
        function show(content, options){
            _snackbar(content, options);
        }
    }
})($,_);