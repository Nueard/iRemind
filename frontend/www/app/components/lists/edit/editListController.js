var app = angular.module('app.controllers');
app.controller('editListController', ['$scope', '$cordovaGeolocation', 'listService', '$state', '$stateParams', 'locations',
	function ($scope, $cordovaGeolocation, listService, $state, $stateParams, locations) {
		$scope.dialogShow = false;
		$scope.name = "";
		$scope.locations = locations;

		$scope.save = function () {
			listService.edit($stateParams.id, $scope.locations);
			$state.go("main.lists");
		}

		$scope.update = function(locations) {
			$scope.locations = locations;
		}
	}]);
