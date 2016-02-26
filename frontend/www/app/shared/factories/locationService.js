/* global angular */
var app = angular.module('app.services');
app.factory('locationService', ['dbService', function (dbService) {
    var add = function (location) {
        var query = "INSERT INTO locations (list_id, latitude, longitude, name) VALUES (?,?,?,?)";
        var params = [location.list_id, location.lat, location.lng, location.name];
        dbService.exec(query, params).then(function (res) {
        }, function (err) {
            console.error(err);
        });
    }

    var get = function (id) {
        var query = "";
        if (id) {
            query = "SELECT * FROM locations WHERE list_id = " + id;
        } else {
            query = "SELECT * FROM locations";
        }
        return dbService.exec(query, []);
    }

    return {
        add: add,
        get: get
    };
}]);