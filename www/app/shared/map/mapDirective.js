var app = angular.module('app.directives');
app.directive('map',['$cordovaGeolocation', function($cordovaGeolocation) {
    return {
        link: function(scope, element, attrs) {
            document.addEventListener("deviceready", function () {
                google.maps.event.addDomListener(window, 'load', function() {
                    var myLatlng = new google.maps.LatLng(37.3000, -120.4833);

                    var mapOptions = {
                        center: myLatlng,
                        zoom: 16,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };

                    var map = new google.maps.Map(element[0], mapOptions);

                    var posOptions = { timeout: 10000, enableHighAccuracy: false };
                    $cordovaGeolocation
                        .getCurrentPosition(posOptions)
                        .then(function (position) {
                            map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
                            var myLocation = new google.maps.Marker({
                                position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                                map: map,
                                title: "My Location"
                            });
                        }, function (err) {
                            // error
                        });

                    scope.map = map;
                });
            });
        }
    }
}]);
