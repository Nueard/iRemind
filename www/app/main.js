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
app.run(['$cordovaSQLite', function ($cordovaSQLite) {
    document.addEventListener("deviceready", function () {
        var db = $cordovaSQLite.openDB({name: "iremind.db"});
        // Setup queries
        var queries = [
            "CREATE TABLE IF NOT EXISTS locations (id integer primary key, latitude real, longitude real)",
            "CREATE TABLE IF NOT EXISTS lists (id integer primary key, location int)"
        ];
        queries.forEach(function (query) {
            $cordovaSQLite.execute(db, query).then(function (res) {
            }, function (err) {
                console.error(err);
            });
        })
    }, false);
}]);
