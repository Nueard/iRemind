/* global angular */
var app = angular.module('app.services');
app.factory('dbService', ['$cordovaSQLite', function ($cordovaSQLite) {
    var db = null;

    var init = function () {
        db = $cordovaSQLite.openDB({ name: "iremind.db" });
        // Setup queries
        var queries = [
            "DROP TABLE IF EXISTS locations",
            "DROP TABLE IF EXISTS lists",
            "CREATE TABLE IF NOT EXISTS locations (id integer primary key, latitude real, longitude real, name text)",
            "CREATE TABLE IF NOT EXISTS lists (id integer primary key, name text)"
        ];
        queries.forEach(function (query) {
            $cordovaSQLite.execute(db, query).then(function (res) {
            }, function (err) {
                console.error(err);
            });
        })
    }
    
    // Executes query 
    var exec = function (query,params) {
        if (db != null) {
            return $cordovaSQLite.execute(db, query, params);
        } else {
            console.error("Database not initialised, but querried");
            return null;
        }
    }

    return {
        init: init,
        exec: exec
    };
}]);