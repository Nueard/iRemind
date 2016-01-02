/* global angular */
var app = angular.module('app.services');
app.factory('runService', ['$interval', 'reminderService', '$cordovaGeolocation', 'locationService',
    '$cordovaLocalNotification', '$cordovaVibration', 'throttle',
    function ($interval, reminderService, $cordovaGeolocation, locationService, $cordovaLocalNotification,
        $cordovaVibration, throttle) {

        var issueNotification = throttle(function () {
            $cordovaVibration.vibrate(3000);
            $cordovaLocalNotification.schedule({
                id: 1,
                title: 'You are near a POI',
                text: 'reminder.note'
            });
        }, 2 * 60 * 1000);

        var getDistance = function (p1, p2) {
            var R = 6371000; // metres
            var f1 = p1.lat * Math.PI / 180.0;
            var f2 = p2.lat * Math.PI / 180.0;
            var df = (p2.lat - p1.lat) * Math.PI / 180.0;
            var dl = (p2.lng - p1.lng) * Math.PI / 180.0;

            var a = Math.sin(df / 2) * Math.sin(df / 2) +
                Math.cos(f1) * Math.cos(f2) *
                Math.sin(dl / 2) * Math.sin(dl / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            return R * c;
        }

        var tick = function () {
            reminderService.get().then(function (res) {
                var reminders = [];
                for (var i = 0; i < res.rows.length; i++) {
                    reminders.push(res.rows.item(i));
                }
                var posOptions = { timeout: 10000, enableHighAccuracy: true };
                $cordovaGeolocation
                    .getCurrentPosition(posOptions)
                    .then(function (position) {
                        var lat = position.coords.latitude;
                        var lng = position.coords.longitude;
                        reminders.forEach(function (reminder) {
                            locationService.get(reminder.list).then(function (res) {
                                for (var i = 0; i < res.rows.length; i++) {
                                    var location = res.rows.item(i);
                                    var p1 = {
                                        lat: lat,
                                        lng: lng
                                    };
                                    var p2 = {
                                        lat: location.latitude,
                                        lng: location.longitude
                                    };
                                    if (getDistance(p1, p2) < reminder.radius) {
                                        issueNotification(reminder);
                                    }
                                }
                            }, function (err) {
                                console.error(err);
                            })
                        });
                    }, function (err) {
                        console.error(err);
                    });
            }, function (err) {
                console.error(err);
            })
        }

        var interval = null;

        var start = function () {
            $cordovaLocalNotification.hasPermission(function (granted) {
                alert('Permission has been granted: ' + granted);
            });
            $cordovaLocalNotification.promptForPermission(function () {
                alert('registered Permission');
            });
            interval = $interval(tick, 5000);
        }

        var stop = function () {
            $interval.cancel(interval);
        }

        return {
            start: start,
            stop: stop
        }
    }]);

app.run(["runService", function (runService) {
    document.addEventListener("deviceready", function () {
        runService.start();
    }, false);
}]);