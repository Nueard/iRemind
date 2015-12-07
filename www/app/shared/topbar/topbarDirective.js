var app = angular.module('app.directives');
app.directive('topbar', [function() {
    return {
        templateUrl: 'app/shared/topbar/topbarView.html',
        link: function(scope, element, attrs) {

        }
    }
}]);
