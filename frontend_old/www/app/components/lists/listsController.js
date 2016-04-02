var app = angular.module('app.controllers');
app.controller('listsController', ['$scope', 'listService', '$state',
    function ($scope, listService, $state) {
        var getLists = function () {
            listService.get().then(function (res) {
                $scope.lists = [];
                for (var i = 0; i < res.rows.length; i++) {
                    $scope.lists.push(res.rows.item(i));
                }
                $scope.lists.forEach(function(list, i) {
                    $scope.lists[i].edit = false;
                    $scope.lists[i].rename = $scope.lists[i].name;
                })
            }, function (err) {
                console.error(err);
            })
        }

        $scope.delete = function (list) {
            listService.delete(list.id).then(function (res) {
                getLists();
            }, function (err) {
                console.error(err);
            })
        }

        $scope.editList = function(list) {
            $state.go("main.lists.edit", {id: list.id});
        }

        $scope.toggleEdit = function(list) {
            list.edit = !list.edit;
        }

        $scope.save = function(list) {
            list.name = list.rename;
            $scope.toggleEdit(list);
        }

        $scope.cancel = function(list) {
            list.rename = list.name;
            $scope.toggleEdit(list);
        }

        getLists();
    }]);
