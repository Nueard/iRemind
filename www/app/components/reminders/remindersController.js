/* global ons */
var app = angular.module('app.controllers');
app.controller('remindersController', ['$scope',
	function ($scope) {		
        $scope.createReminder = function() {
			ons.createDialog('app/components/reminders/createReminderView.html').then(function(dialog) {
				dialog.show();
				dialog._scope.name = "";
				dialog._scope.note = "";
				dialog._scope.search = "";
                
                dialog._scope.close = dialog.destroy;
			});
		}
	}]);
