/* global ons */
var app = angular.module('app.controllers');
app.controller('createReminderController', ['$scope', '$state', 'listService', 'reminderService',
    function ($scope, $state, listService, reminderService) {
        $scope.form = {
            note: "",
            place: "",
            radius: 50,
            volume: 50,
            results: [],
            selected: null
        };

        $scope.close = function () {
            console.log("closing");
            $state.go("main.reminders");
        }

        $scope.ok = function () {
            var data = {
                list: $scope.form.selected.id,
                volume: $scope.form.volume,
                note: $scope.form.note,
                radius: $scope.form.radius
            };
            reminderService.add(data).then(function (res) {
                $state.go("main.reminders");
            }, function (err) {
                console.error(err);
            });
        }

        $scope.select = function (result) {
            console.log(result);
            $scope.form.selected = result;
            $scope.form.place = result.name;
        }


        $scope.search = function (a) {
            $scope.form.selected = null;
            listService.get($scope.form.place).then(function (res) {
                $scope.form.results = [];
                for (var i = 0; i < res.rows.length; i++) {
                    $scope.form.results.push(res.rows.item(i));
                }
            }, function (err) {
                console.error(err);
            })
        }
    }]);
