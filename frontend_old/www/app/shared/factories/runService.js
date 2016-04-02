/* global angular */
var app = angular.module('app.services');
app.factory('runService', ['reminderService', 'locationService', '$cordovaLocalNotification', '$cordovaVibration', '$rootScope',
    function(reminderService, locationService, $cordovaLocalNotification, $cordovaVibration, $rootScope) {

        var initialize = function() {
            window.geofence.removeAll().then(function() {
                console.log(
                    'All geofences successfully removed.'
                );
            }, function(reason) {
                console.log('Removing geofences failed',
                    reason);
            });

            reminderService.get().then(function(reminders) {
                reminders.forEach(function(reminder) {
                    locationService.getByList(reminder.list).then(function(locations){
                        var points = [];
                        locations.forEach(function(
                            location) {
                            points.push({
                                id: location.id,
                                latitude: location.latitude,
                                longitude: location.longitude,
                                radius: reminder.radius,
                                transitionType: 1,
                                // notification: {
                                //     title: reminder.note,
                                //     text: "You reached a point of interest",
                                //     openAppOnClick: true,
                                //     vibration: [0],
                                //     data: reminder
                                // }
                            });
                        });

                        if (points.length > 0) {
                            window.geofence.addOrUpdate(points).then(
                                function() {
                                    console.log('Geofences sucessfully added');
                                },
                                function(reason) {
                                    console.log('Adding geofences failed',reason);
                                });

                            window.geofence.getWatched().then(function(
                                geofencesJson) {
                                var geofences = JSON.parse(geofencesJson);
                                console.log(geofences);
                            });
                        }
                    });
                })
            });


            window.geofence.onTransitionReceived = function(geofences) {
                geofences.forEach(function(geo) {
                    console.log('Geofence transition detected',geo);
                    $cordovaLocalNotification.schedule({
                        id: 1,
                        title: 'Title here',
                        text: 'Click to turn reminder off',
                        data: geo.id
                    }).then(function (result) {
                    // ...
                    });
                });
            };

            $rootScope.$on('$cordovaLocalNotification:click',
            function (event, notification, state) {
                console.log(notification.data);
            });
        }

        return {
            initialize: initialize
        }
    }
]);
