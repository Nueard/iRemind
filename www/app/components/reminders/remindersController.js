/* global ons */
var app = angular.module('app.controllers');
app.controller('remindersController', ['$scope', "reminderService",
    function ($scope, reminderService) {
        var getReminders = function () {
            reminderService.get().then(function (res) {
                $scope.reminders = [];
                for (var i = 0; i < res.rows.length; i++) {
                    $scope.reminders.push(res.rows.item(i));
                }
            }, function (err) {
                console.error(err);
            })
        }

        $scope.delete = function (reminder) {
            reminderService.delete(reminder.id).then(function () {
                getReminders();
            }, function (err) {
                console.error(err);
            })
        }

        document.addEventListener("deviceready", function () {
            getReminders();
        });
    }]);
