(function(window) {
    'use strict';
    angular.module('mean.comments').filter('dateFormat', dateFormat);
    dateFormat.$inject = ['$filter'];
    // A little filter to format the dates in an elegant way
    // to the format MMM dd yyyy - HH:mm:ss
    // to type less caracters in the view and make it cleaner
    // Note: if the app using diffent time formatting then the
    // right way to do this will be $locale and dynamicLocale
    function dateFormat($filter) {
        return function(input) {
            if (input === null) {
                return '';
            }
            var _date = $filter('date')(new Date(input), 'MMM dd yyyy - HH:mm:ss');
            return _date.toUpperCase();
        }
    }
}(window));
