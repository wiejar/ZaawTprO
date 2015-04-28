/**
 * Created by slawek on 2015-04-18.
 */

(function(){
    'use strict';

    angular.module('application.posts.directives').directive('posts', posts);

    function posts(){
        var directives = {
            controller: 'PostController',
            controllerAs: 'vm',
            restrict: 'E',
            scope: {
                posts: '='
            },
            templateUrl: 'static/templates/posts/posts.html'
        };

        return directives;
    }
})();