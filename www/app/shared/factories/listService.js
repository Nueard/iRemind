/* global angular */
var app = angular.module('app.services');
app.factory('listService', ['dbService', 'locationService',
    function (dbService, locationService) {
        var add = function (list) {
            var query = "INSERT INTO lists (name) VALUES (?)";
            var params = [list.name];
            var res = dbService.exec(query, params);
            res.then(function (res) {
                list.locations.forEach(function (location) {
                    location.list_id = res.insertId;
                    locationService.add(location);
                })
            }, function (err) {
                console.error(err);
            })
        }

        var append = function (id, locations) {

        }

        var del = function (id) {
            var query = "DELETE FROM lists WHERE id = " + id;
            return dbService.exec(query, []);
        }

        var get = function (term) {
            var query = "";
            if (!term) {
                query = "SELECT * FROM lists";
            } else {
                query = "SELECT * FROM lists WHERE name LIKE '%" + term + "%'";
            }
            return dbService.exec(query, []);
        }

        return {
            add: add,
            append: append,
            get: get,
            delete: del
        };
    }]);