(function(window) {
    'use strict';
    angular.module('mean.comments').filter('createAnchors', createAnchors);
    createAnchors.$inject = ['$sce'];
    // This filter changes html links to trusted anchors
    // Just for the sake of this exercice
    // in real use case scenarios this might not be the same implementation
    function createAnchors($sce) {
        return function(str) {
            return $sce.trustAsHtml(str.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(
                /(http[^\s]+)/g,
                '<a href="$1" target="_blank">$1</a>'));
        }
    }
}(window));
