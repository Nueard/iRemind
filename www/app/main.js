/* global angular */
var app = angular.module('app', ['ngCordova', 'ui.router', 'app.controllers', 'app.services', 'app.directives']);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/");
	$stateProvider
		.state('main', {
			url: "/",
			templateUrl: "app/components/login/loginView.html",
			controller: 'loginController'
		})
}]);

app.run(['$cordovaSQLite', function($cordovaSQLite) {
	document.addEventListener("deviceready", function () {
		db = $cordovaSQLite.openDB("iremind.db");
        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text)");
	}, false);
}]);
