/**
 * Created by slawek on 2015-04-12.
 */

(function(){
    angular.module('application.config').config(config);

    config.$inject = ['$locationProvider'];

    /**
     * @class config
     * @description This class creates configuration for user.
     * @param $locationProvider Injected service which provides current location.
     */
    function config($locationProvider){
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
    }
})();