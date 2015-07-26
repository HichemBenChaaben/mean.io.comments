(function(window) {
    'use strict';
    angular.module('mean.comments')
        .factory('Comments', ['$resource',
            function($resource) {
                return $resource('api/comments/:articleId', {
                    articleId: '@articleId'
                }, {
                    update: {
                        method: 'PUT'
                    }
                });
            }
        ]);
}(window));
