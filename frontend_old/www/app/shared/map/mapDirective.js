/* global google */
var app = angular.module('app.directives');
app.directive('map', ['$cordovaGeolocation', 'locationService', 'listService',
    function ($cordovaGeolocation, locationService, listService) {
        return {
            templateUrl: "app/shared/map/mapView.html",
            restrict: "EA",
            scope: {
                update: "&",
                locations: "=?"
            },
            link: function (scope, element, attrs) {
                var mapOptions = {
                    zoom: 16,
                    mapTypeControl: false,
                    disableDefaultUI: true,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                var images = {
                    person: {
                        url: "assets/images/person.png",
                        scaledSize: new google.maps.Size(32, 32),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(16, 16)
                    },
                    marker: {
                        url: "assets/images/marker.png",
                        scaledSize: new google.maps.Size(32, 32),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(16, 32)
                    }
                };

                var markers = [];
                var map = new google.maps.Map(element[0].children[0], mapOptions);

                var posOptions = { timeout: 10000, enableHighAccuracy: true };
                $cordovaGeolocation
                    .getCurrentPosition(posOptions)
                    .then(function (position) {
                        map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
                        var myLocation = new google.maps.Marker({
                            position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                            map: map,
                            title: "My Location",
                            icon: images.person
                        });
                    }, function (err) {
                        console.error(err);
                    });

                var input = element[0].children[1];
                var searchBox = new google.maps.places.SearchBox(input);
                map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);

                var update = function() {
                    var locations = [];
                    markers.forEach(function (marker) {
                        locations.push({
                            lat: marker.position.lat(),
                            lng: marker.position.lng(),
                            name: marker.title
                        });
                    })
                    scope.update({locations: locations});
                }

                var clearInvalidMarkers = function() {
                    for(var i=0; i< markers.length; i++) {
                        if(markers[i].map == null) {
                            markers.splice(i,1);
                            i--;
                        }
                    }
                }

                var addLocation = function (position, name) {
                    var marker = new google.maps.Marker({
                        map: map,
                        title: name,
                        position: position,
                        icon: images.marker
                    });

                    marker.addListener('click', function (a) {
                        marker.setMap(null);
                        clearInvalidMarkers();
                        update();
                    });

                    markers.push(marker);
                    update();
                }

                var clearMarkers = function () {
                    markers.forEach(function (marker) {
                        marker.setMap(null);
                    })
                    clearInvalidMarkers();
                    update();
                }

                var searchPlaces = function () {
                    var places = searchBox.getPlaces();
                    clearMarkers();

                    if (places.length == 0) {
                        return;
                    }
                    var bounds = new google.maps.LatLngBounds();
                    clearMarkers();

                    places.forEach(function (place) {
                        addLocation(place.geometry.location, place.name);

                        if (place.geometry.viewport) {
                            bounds.union(place.geometry.viewport);
                        } else {
                            bounds.extend(place.geometry.location);
                        }
                    });
                    map.fitBounds(bounds);
                }

                if(scope.locations) {
                    scope.locations.forEach(function(location) {
                        let position = new google.maps.LatLng(location.latitude, location.longitude);
                        addLocation(position, location.name);
                    });
                }

                var addClickLocation = function (e) {
                    addLocation(e.latLng, 'Custom location');
                }

                map.addListener('click', addClickLocation);
                searchBox.addListener('places_changed', searchPlaces);

                var boundsChanged = function () {
                    searchBox.setBounds(map.getBounds());
                }
                map.addListener('bounds_changed', boundsChanged);
            }
        }
    }]);
