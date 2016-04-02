import {Page, NavController, Platform, Alert, Storage, SqlStorage} from 'ionic-angular';
import {ListService, List} from '../../../services/listService';
import {Lists} from '../lists';

declare var google: any;

@Page({
    templateUrl: 'build/pages/lists/create/createList.html'
})
export class CreateList {
    map: any;
    markers: any = [];
    search: any = "";

    constructor(platform: Platform, private nav: NavController, private listService: ListService) {
        platform.ready().then(() => {
            this.loadMap();
        });
    }

    loadMap() {
        let options = { timeout: 10000, enableHighAccuracy: true };
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                let mapOptions = {
                    center: latLng,
                    zoom: 15,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                }
                this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
                this.map.addListener('click', this.addClickLocation);
                this.markers = [];
                this.addMarker(latLng, false);
            },
            (error) => {
                console.log(error);
            }, options
        );
    }

    addMarker = (position, removable: boolean) => {
        let marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: position
        });
        if (removable) {
            marker.addListener('click', () => {
                marker.setMap(null);
                this.markers = this.markers.filter((marker) => {
                    return marker.map != null;
                });
            });
            this.markers.push(marker);
        }
    }

    addClickLocation = (event) => {
        this.addMarker(event.latLng, true);
    }

    clearAllMarkers = () => {
        this.markers.forEach((marker) => {
            marker.setMap(null);
        });
        this.markers = [];
    }

    onInput(searchBox) {
        let query = searchBox.value.trim();
        if (query == "") {
            this.clearAllMarkers();
        } else {
            var request = {
                bounds: this.map.getBounds(),
                keyword: query
            };

            let service = new google.maps.places.PlacesService(this.map);
            service.radarSearch(request, this.searchResults);
        }
    }

    searchResults = (results, status) => {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            this.clearAllMarkers();
            for (var i = 0; i < results.length; i++) {
                this.addMarker(results[i].geometry.location, true);
            }
        } else if (status == google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
            let alert = Alert.create({
                title: 'Nothing found',
                subTitle: 'There are no search results, please make your search query less specific.',
                buttons: ['OK']
            });
            this.clearAllMarkers();
            this.search = "";
            this.nav.present(alert);
        }
    }
    
    

    save() {
        let alert = Alert.create({
            title: 'Name it bruh',
            inputs: [
                {
                    name: 'name',
                    placeholder: 'Name'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Save',
                    handler: data => {
                        if (data.name.trim().length != 0) {
                            let locations = [];
                            this.markers.forEach((marker) => {
                                console.log(marker);
                                let lat = marker.position.lat();
                                let lng = marker.position.lng();
                                console.log(lat, lng);
                                locations.push({
                                    name: "asd",
                                    latitude: lat,
                                    longitude: lng,
                                });
                            })
                            let list: List = {
                                name: data.name,
                                locations: locations
                            };
                            this.listService.add(list);
                            this.nav.setRoot(Lists);
                        }
                    }
                }
            ]
        });
        this.nav.present(alert);
    }

}
