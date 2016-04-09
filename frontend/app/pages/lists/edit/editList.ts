import {Page, NavController, Platform, Alert, Storage, SqlStorage, NavParams} from 'ionic-angular';
import {ListService, List} from '../../../services/listService';
import {Lists} from '../lists';

declare var google: any;

@Page({
    templateUrl: 'build/pages/lists/create/createList.html'
})
export class EditList {
    map: any;
    markers: any = [];
    search: any = "";
    list: any;
    edit = true;


    constructor(platform: Platform,
        private nav: NavController,
        private listService: ListService,
        private navParams: NavParams) {
        this.list = this.navParams.get("list");
        if (!this.list) {
            console.error("List invalid");
            this.nav.pop();
        } else {
            platform.ready().then(() => {
                let position = new google.maps.LatLng(0, 0);
                let mapOptions = {
                    center: position,
                    zoom: 15,
                    disableDefaultUI: true,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                }
                this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
                this.map.addListener('click', this.addClickLocation);
                let bounds = new google.maps.LatLngBounds();
                this.list.locations.forEach((location) => {
                    let position = new google.maps.LatLng(location.latitude, location.longitude);
                    bounds.extend(position);
                    this.addMarker(position, true, location.radius);
                });
                this.map.fitBounds(bounds);
            });
        }
    }

    addMarker = (position, removable: boolean, radius: number = 50) => {
        let marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: position
        });
        if (removable) {
            marker.radius = radius;
            let circle = new google.maps.Circle({
                map: this.map,
                center: position,
                radius: marker.radius,
                editable: true
            });
            circle.addListener('radius_changed', () => {
                marker.radius = circle.getRadius();
            });
            marker.addListener('click', () => {
                marker.setMap(null);
                circle.setMap(null);
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
    
    delete() {
        this.listService.del(this.list.id).then(() => {
            this.nav.setRoot(Lists);
        });
    }

    save() {
        let alert = Alert.create({
            title: 'Name it bruh',
            inputs: [
                {
                    name: 'name',
                    placeholder: 'Name',
                    value: this.list.name
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
                                locations.push({
                                    name: "Custom location",
                                    latitude: marker.position.lat(),
                                    longitude: marker.position.lng(),
                                    radius: Math.round(marker.radius)
                                });
                            })
                            let list: List = {
                                name: data.name,
                                locations: locations,
                                favourite: 0
                            };
                            this.listService.edit(this.list.id, list).then(() => {
                                this.nav.setRoot(Lists);
                            });
                        }
                    }
                }
            ]
        });
        this.nav.present(alert);
    }
}
