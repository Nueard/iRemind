/* global angular */
var app = angular.module("app", ["ngCordova", "ui.router", "onsen", "app.controllers", "app.services", "app.directives"]);

app.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("main", {
            url: "/",
            views: {
                "main": {
                    templateUrl: "app/shared/main/mainView.html",
                    controller: "mainController"
                }
            }
        })
        .state("main.reminders", {
            url: "reminders/",
            views: {
                "topbar": {
                    templateUrl: "app/shared/topbar/topbarView.html"
                },
                "content": {
                    templateUrl: "app/components/reminders/remindersView.html",
                    controller: "remindersController"
                }
            }
        })
        .state("main.reminders.create", {
            url: "create/",
            views: {
                "topbar": {
                    templateUrl: "app/shared/topbar/topbarView.html"
                },
                "content@main": {
                    templateUrl: "app/components/createReminder/createReminderView.html",
                    controller: "createReminderController"
                }
            }
        })
        .state("main.lists", {
            url: "lists/",
            views: {
                "topbar": {
                    templateUrl: "app/shared/topbar/topbarView.html"
                },
                "content": {
                    templateUrl: "app/components/lists/listsView.html",
                    controller: "listsController"
                }
            }
        })
        .state("map", {
            url: "/map/",
            views: {
                "topbar": {
                    templateUrl: ""
                },
                "main": {
                    templateUrl: "app/components/map/mapView.html",
                    controller: "mapController"
                }
            }
        })
    $urlRouterProvider.otherwise("/");
}]);

// Database setup
app.run(["dbService", function (dbService) {
    document.addEventListener("deviceready", function () {
        dbService.init();

        document.addEventListener("backbutton", function () {
            window.history.go(-1);
        });
    }, false);
}]);

app.controller("mainController", ["$state",
    function ($state) {
        $state.go("main.reminders")
    }]);