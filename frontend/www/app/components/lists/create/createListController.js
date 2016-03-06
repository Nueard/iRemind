var app = angular.module('app.controllers');
app.controller('createListController', ['$scope', '$cordovaGeolocation', 'listService', '$state',
	function ($scope, $cordovaGeolocation, listService, $state) {
		$scope.dialogShow = false;
		$scope.name = "";
		$scope.locations = [];

		$scope.showDialog = function () {
			$scope.dialogShow = true;
		}

		$scope.save = function () {
			var list = {
				name: $scope.name,
				locations: $scope.locations
			};
			listService.add(list);
			$state.go("main.lists");
		}

		$scope.cancel = function () {
			$scope.dialogShow = false;
			$scope.name = "";
		}

		$scope.update = function(locations) {
			$scope.locations = locations;
		}
	}]);
