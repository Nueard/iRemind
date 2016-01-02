var app = angular.module('app.controllers');
app.controller('listsController', ['$scope', 'listService',
    function ($scope, listService) {
        var getLists = function () {
            listService.get().then(function (res) {
                $scope.lists = [];
                for (var i = 0; i < res.rows.length; i++) {
                    $scope.lists.push(res.rows.item(i));
                }
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

        getLists();
    }]);
