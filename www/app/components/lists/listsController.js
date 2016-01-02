var app = angular.module('app.controllers');
app.controller('listsController', ['$scope', 'listService',
    function ($scope, listService) {
        var getLists = function() {
            listService.getLists().then(function(res) {
                console.log(res);
                console.log(res.rows.item(0));
                $scope.lists = [];
                for(var i=0;i<res.rows.length;i++) {
                    $scope.lists.push(res.rows.item(i));
                }
            }, function(err){
                console.error(err);
            })
        }
        
        
        getLists();
    }]);
