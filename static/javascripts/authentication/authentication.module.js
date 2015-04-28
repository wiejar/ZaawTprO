/**
 * Created by slawek on 2015-04-12.
 */

(function(){
    'use strict';

    angular.module('application.authentication',['application.authentication.controllers', 'application.authentication.services']);
    angular.module('application.authentication.controllers',[]);
    angular.module('application.authentication.services',['ngCookies']);
})();