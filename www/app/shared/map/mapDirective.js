/* global google */
var app = angular.module('app.directives');
app.directive('map', ['$cordovaGeolocation', function ($cordovaGeolocation) {
    return {
        templateUrl: "app/shared/map/mapView.html",
        link: function (scope, element, attrs) {
            
            // Initialise map with center current position
            var mapOptions = {
                zoom: 16,
                mapTypeControl: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(element[0].children[0], mapOptions);
            var posOptions = { timeout: 10000, enableHighAccuracy: true };
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
                    console.error(err);
                });

            // Create the search box and link it to the UI element.
            var input = element[0].children[1];
            var searchBox = new google.maps.places.SearchBox(input);
            map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);
            markers = [];
            // Done loading and setting up map
            
            // Helper functions for events
            var addCustomLocation = function (position, name) {
                var marker = new google.maps.Marker({
                    map: map,
                    title: name,
                    position: position
                });
                // Attach click event to remove marker from map
                marker.addListener('click', function(a){
                     marker.setMap(null);
                     marker = null;
                });
                markers.push(marker);
                window.localStorage['markers'] = [];
                markers.forEach
            }

            var clearCustomLocations = function () {
                markers.forEach(function (marker) {
                    marker.setMap(null);
                })
            }
            
            // Click event on map for manual location
            map.addListener('click', function (e) {
                addCustomLocation(e.latLng, 'Custom location');
            });

            // Bias the SearchBox results towards current map's viewport.
            map.addListener('bounds_changed', function () {
                searchBox.setBounds(map.getBounds());
            });

            var markers = [];
            // Listen for the event fired when the user selects a prediction and retrieve
            // more details for that place.
            searchBox.addListener('places_changed', function () {
                var places = searchBox.getPlaces();
                if (places.length == 0) {
                    return;
                }

                // Clear out the old markers.
                markers.forEach(function (marker) {
                    marker.setMap(null);
                });

                // For each place, get the icon, name and location.
                var bounds = new google.maps.LatLngBounds();
                clearCustomLocations();
                places.forEach(function (place) {
                    addCustomLocation(place.geometry.location, place.name);

                    if (place.geometry.viewport) {
                        // Only geocodes have viewport.
                        bounds.union(place.geometry.viewport);
                    } else {
                        bounds.extend(place.geometry.location);
                    }
                });
                map.fitBounds(bounds);
            });

            scope.map = map;
        }
    }
}]);
