/* global ons */
var app = angular.module('app.controllers');
app.controller('remindersController', ['$scope', "reminderService",
    function ($scope, reminderService) {

        var getReminders = function () {
            reminderService.get().then(function(reminders){
                console.log(reminders);
                $scope.reminders = reminders;
            });
        }

        $scope.delete = function (reminder) {
            reminderService.delete(reminder.id).then(function () {
                getReminders();
            }, function (err) {
                console.error(err);
            })
        }

        $scope.change = function() {
            alert("asd");
            console.log(asd);
        }

        ons.ready(function() {
            getReminders();
        });
    }]);
