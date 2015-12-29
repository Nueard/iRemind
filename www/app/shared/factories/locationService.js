/* global angular */
var app = angular.module('app.services');
app.factory('locationService', ['dbService', function (dbService) {
    var addLocation = function (location) {
        var query = "INSERT INTO locations (latitude, longitude, name) VALUES (?,?,?)";
        var params = [location.lat, location.lng, location.name];
        dbService.exec(query, params).then(function (res) {
            console.log(res);
        }, function (err) {
            console.error(err);
        });
    }

    return {
        addLocation: addLocation
    };
}]);