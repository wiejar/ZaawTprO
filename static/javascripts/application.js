(function(){
    'use strict';


    angular.module('application',
        ['application.config',
        'application.routes',
        'application.authentication',
        'application.layout',
        'application.products',
        'application.profiles',
        'application.orders',
        'application.utils',
        'application.basket']).run(run);
    angular.module('application.routes', ['ngRoute']);
    angular.module('application.config',[]);

    run.$inject = ['$http'];

    /**
     * @class run
     * @description This class creates route.
     * @param $http Injected service which allow to go into another page.
     */
    function run($http){
        $http.defaults.xsrfHeaderName='X-CSRFToken';
        $http.defaults.xsrfCookieName='csrftoken';
    }
})();