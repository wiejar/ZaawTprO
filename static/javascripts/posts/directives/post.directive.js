/**
 * Created by slawek on 2015-04-18.
 */

(function(){
    'use strict';

    angular.module('application.posts.directives').directive('post', post);

    function post(){
        var directive ={
            restrict: 'E',
            scope: {
                post: '='
            },
            templateUrl: 'static/templates/posts/post.html'
        };

        return directive;
    }
})();