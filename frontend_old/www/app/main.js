/* global angular */
var app = ons.bootstrap("app", ["ngCordova", "ui.router", "onsen", "app.controllers", "app.services", "app.directives"]);

// Database setup
app.run(["dbService", "runService", function(dbService, runService) {

    ons.ready(function() {
        ons.setDefaultDeviceBackButtonListener(function() {
            if (navigator.notification.confirm("Are you sure to close the app?",
                    function(index) {
                        if (index === 1) { // OK button
                            navigator.app.exitApp(); // Close the app
                        }
                    }
                ));
        });
    });
    document.addEventListener("deviceready", function() {
        dbService.init();

        // document.addEventListener("backbutton", function () {
        //     window.history.go(-1);
        // });

        window.geofence.initialize();

        runService.initialize();
    }, false);
}]);

app.controller("mainController", ["$state",
    function($state) {
        // $state.go("main.reminders")
    }
]);
