import {Injectable} from 'angular2/core';
import {ReminderService} from './reminderService';
import {LocationService} from './locationService';
import {LocalNotifications} from 'ionic-native';

declare var window: any;

export interface Geofence {
    id: number,
    latitude: number,
    longitude: number,
    radius: number,
    transitionType: number
}

@Injectable()
export class GeofenceService {
    geofences: Array<Geofence>
    initialised: boolean = false;

    constructor(private locationService: LocationService) { }

    init = () => {
        window.geofence.initialize();
        this.initialised = true;
        window.geofence.onTransitionReceived = this.triggerCallback;
        this.sync();
    }

    private triggerCallback = (geofences) => {
        geofences.forEach((geo) => {
            console.log('Geofence transition detected', geo);
            LocalNotifications.schedule({
                id: 1,
                title: 'Title here',
                text: 'Click to turn reminder off',
                data: geo.id
            });
        });
    }

    sync() {
        if (this.initialised) {
            this.locationService.getActive().then((dbLocations) => {
                this.get().then((gfLocations) => {
                    // Check if dbLocations are not in geofence
                    dbLocations.forEach((dbLocation) => {
                        let index = gfLocations.findIndex((location: any) => {
                            return location.id == dbLocation.id;
                        })
                        if (index == -1) {
                            let location: Geofence = {
                                id: dbLocation.id,
                                latitude: dbLocation.latitude,
                                longitude: dbLocation.longitude,
                                radius: dbLocation.radius,
                                transitionType: 1
                            }
                            this.add([location]);
                        }
                    });
                    // Check if gfLocations are in geofence but removed from DB
                    gfLocations.forEach((gfLocation) => {
                        let index = dbLocations.findIndex((location: any) => {
                            return location.id == gfLocation.id;
                        })
                        if (index == -1) {
                            this.remove(gfLocation.id);
                        }
                    });
                });
            });
        } else {
            console.error("GeofenseService not initialized");
        }
    }

    remove(id: number) {
        window.geofence.remove(id).then(
            (suc) => { },
            this.err
        );
    }

    add(locations: Array<Geofence>) {
        window.geofence.addOrUpdate(locations).then(
            () => { },
            this.err);
    }

    get() {
        return window.geofence.getWatched().then(
            (geofences) => {
                return JSON.parse(geofences);
            },
            this.err);
    }

    err(err) {
        console.error(err);
    }
}