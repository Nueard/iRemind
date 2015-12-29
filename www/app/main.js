/* global angular */
var app = angular.module('app', ['ngCordova', 'ui.router', 'onsen', 'app.controllers', 'app.services', 'app.directives']);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    console.log("Running");
    $stateProvider
        .state('main', {
            url: "/",
            views: {
                topbar: {
                    templateUrl: "app/shared/topbar/topbarView.html"
                },
                main: {
                    templateUrl: "app/components/reminders/remindersView.html",
                    controller: 'remindersController'
                }
            }
        })
        .state('map', {
            url: "/map/",
            views: {
                topbar: {
                    templateUrl: ''
                },
                main: {
                    templateUrl: "app/components/map/mapView.html",
                    controller: 'mapController'
                }
            }
        })
    $urlRouterProvider.otherwise("/");
}]);

// Database setup
app.run(['dbService', function (dbService) {
    document.addEventListener("deviceready", function () {
        dbService.init();
    }, false);
}]);
