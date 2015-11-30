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