var app = angular.module('app.controllers');
app.controller('loginController', ['$scope', '$cordovaGeolocation',
	function ($scope, $cordovaGeolocation) {
		$scope.greeting = 'Hola Amigo! It kind of works!';

		var posOptions = { timeout: 10000, enableHighAccuracy: true };
		$cordovaGeolocation
			.getCurrentPosition(posOptions)
			.then(function (position) {
				console.log(position);
			}, function (err) {
				// error
			});

		$scope.define = function() {
			window.localStorage['name'] = 'Max';
		}
	}]);
