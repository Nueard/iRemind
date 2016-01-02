/* global ons */
var app = angular.module('app.controllers');
app.controller('remindersController', ['$scope', "reminderService",
    function ($scope, reminderService) {
        var getReminders = function () {
            reminderService.getReminders().then(function (res) {
                $scope.reminders = [];
                for (var i = 0; i < res.rows.length; i++) {
                    $scope.reminders.push(res.rows.item(i));
                }
            }, function (err) {
                console.error(err);
            })
        }

        document.addEventListener("deviceready", function () {
            getReminders();
        });
    }]);
