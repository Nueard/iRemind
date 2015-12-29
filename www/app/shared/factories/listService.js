/* global angular */
var app = angular.module('app.services');
app.factory('listService', ['dbService', 'locationService',
    function (dbService, locationService) {
        var newList = function (list) {
            var query = "INSERT INTO lists (name) VALUES (?)";
            var params = [list.name];
            var res = dbService.exec(query, params);
            res.then(function (res) {
                console.log(res);
                list.locations.forEach(function (location) {
                    locationService.addLocation(location);
                })
            }, function (err) {
                console.error(err);
            })
        }

        return {
            newList: newList
        };
    }]);