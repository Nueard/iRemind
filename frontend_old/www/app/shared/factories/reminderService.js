/* global angular */
var app = angular.module('app.services');
app.factory('reminderService', ['dbService', 'locationService',
    function(dbService, locationService) {
        //"CREATE TABLE IF NOT EXISTS reminders
        //(id integer primary key, list int, note text, radius int, volume int)"
        var add = function(reminder) {
            var query =
                "INSERT INTO reminders (list, note, radius, volume, active) VALUES (?,?,?,?,?)";
            var params = [reminder.list, reminder.note, reminder.radius, reminder.volume, 1];
            return dbService.exec(query, params);
        }

        var get = function() {
            var query = "SELECT * FROM reminders";
            return dbService.exec(query, []).then(getResults);
        }

        var del = function(id) {
            var query = "DELETE FROM reminders WHERE id = " + id;
            return dbService.exec(query, []);
        }

        var setActive = function(id, active) {
            var query = "UPDATE reminders SET active = " + active + " WHERE id = " + id;
            return dbService.exec(query, []);
        }

        var getResults = function(res) {
            var data = [];
            for (var i = 0; i < res.rows.length; i++) {
                data.push(res.rows.item(i));
            }
            return data;
        }

        return {
            add: add,
            get: get,
            setActive: setActive,
            delete: del
        };
    }
]);
