(function($,_){
    'use strict';

    angular.module('application.utils.services').factory('Snackbar', Snackbar);

    function Snackbar(){
        var SnackBar = {
            error: error,
            show: show
        };

        return SnackBar;

        function _snackbar(content, options){
            options = _.extend({timeout: 3000}, options);
            options.content = content;

            $.snackbar(options);
        }

        function error(content, options){
            _snackbar('Error: ' + content, options);
        }

        function show(content, options){
            _snackbar(content, options);
        }
    }
})($,_);