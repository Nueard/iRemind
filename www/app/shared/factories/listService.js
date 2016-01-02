/* global angular */
var app = angular.module('app.services');
app.factory('listService', ['dbService', 'locationService',
    function (dbService, locationService) {
        var newList = function (list) {
            var query = "INSERT INTO lists (name) VALUES (?)";
            var params = [list.name];
            var res = dbService.exec(query, params);
            res.then(function (res) {
                list.locations.forEach(function (location) {
                    location.list_id = res.insertId;
                    locationService.addLocation(location);
                })
            }, function (err) {
                console.error(err);
            })
        }

        var appendToList = function (id, locations) {

        }

        var getLists = function (term) {
            var query = "";
            if (!term) {
                query = "SELECT * FROM lists";
            } else {
                query = "SELECT * FROM lists WHERE name LIKE '%"+term+"%'";
                console.log(query);
            }
            return dbService.exec(query, []);
        }

        return {
            newList: newList,
            appendToList: appendToList,
            getLists: getLists
        };
    }]);