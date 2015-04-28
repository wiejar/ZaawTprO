/**
 * Created by slawek on 2015-04-12.
 */

(function(){
    angular.module('application.config').config(config);

    config.$inject = ['$locationProvider'];

    function config($locationProvider){
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
    }
})();