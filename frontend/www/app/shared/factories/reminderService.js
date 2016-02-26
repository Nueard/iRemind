/* global angular */
var app = angular.module('app.services');
app.factory('reminderService', ['dbService', function (dbService) {
    //"CREATE TABLE IF NOT EXISTS reminders 
    //(id integer primary key, list int, note text, radius int, volume int)"
    var add = function (reminder) {
        var query = "INSERT INTO reminders (list, note, radius, volume) VALUES (?,?,?,?)";
        var params = [reminder.list, reminder.note, reminder.radius, reminder.volume];
        return dbService.exec(query, params);
    }

    var get = function () {
        var query = "SELECT * FROM reminders";
        return dbService.exec(query, []);
    }

    var del = function (id) {
        var query = "DELETE FROM reminders WHERE id = " + id;
        return dbService.exec(query, []);
    }
    return {
        add: add,
        get: get,
        delete: del
    };
}]);