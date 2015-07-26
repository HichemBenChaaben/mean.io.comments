(function(window) {
    'use strict';
    angular.module('mean.comments').config(routeConf);
    routeConf.$inject = ['$stateProvider'];

    function routeConf($stateProvider) {
        $stateProvider.state('Manage comments', {
            url: '/manage',
            templateUrl: '/comments/views/manage.html',
            resolve: {
                loggedin: function(MeanUser) {
                    return MeanUser.checkLoggedin();
                }
            }
        });
    }

}(window));
