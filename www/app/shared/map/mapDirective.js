/* global google */
var app = angular.module('app.directives');
app.directive('map', ['$cordovaGeolocation', 'locationService', 'listService',
    function ($cordovaGeolocation, locationService, listService) {
        return {
            templateUrl: "app/shared/map/mapView.html",
            link: function (scope, element, attrs) {
                var markers = [];
                var mapOptions = {
                    zoom: 16,
                    mapTypeControl: false,
                    disableDefaultUI: true,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                var map = new google.maps.Map(element[0].children[0], mapOptions);
                var posOptions = { timeout: 10000, enableHighAccuracy: true };
                var locations = [];

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
                    marker.addListener('click', function (a) {
                        marker.setMap(null);
                        marker = null;
                    });
                    markers.push(marker);
                    locations = [];
                    markers.forEach(function (marker) {
                        locations.push({
                            lat: marker.position.lat(),
                            lng: marker.position.lng(),
                            name: marker.title
                        });
                    })
                }

                var clearCustomLocations = function () {
                    markers.forEach(function (marker) {
                        marker.setMap(null);
                    })
                }

                var placesChanged = function () {
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
                }

                scope.newListShow = false;
                scope.newListName = "";

                scope.newList = function () {
                    scope.newListShow = true;
                }

                scope.newListOk = function () {
                    var list = {
                        name: scope.newListName,
                        locations: locations
                    };
                    listService.newList(list);
                    scope.newListCancel();
                }

                scope.newListCancel = function () {
                    scope.newListShow = false;
                    scope.newListName = "";
                }

                var addClickLocation = function (e) {
                    addCustomLocation(e.latLng, 'Custom location');
                }

                var boundsChanged = function () {
                    searchBox.setBounds(map.getBounds());
                }

                map.addListener('click', addClickLocation);

                map.addListener('bounds_changed', boundsChanged);

                searchBox.addListener('places_changed', placesChanged);
            }
        }
    }]);
