angular.module('starter.directives', [])

.directive('calendar', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/calendar.html'
    }
})
