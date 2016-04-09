import {Injectable} from 'angular2/core';
import {ReminderService} from './reminderService';
import {LocationService} from './locationService';
import {DbService} from './dbService';
import {LocalNotifications} from 'ionic-native';

declare var window: any;
declare var cordova: any;

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

    constructor(private locationService: LocationService, private dbService: DbService) { }

    init = () => {
        window.geofence.initialize();
        this.initialised = true;
        window.geofence.onTransitionReceived = this.triggerCallback;
        this.sync();
        LocalNotifications.on("clear", this.deactivateReminder);
        LocalNotifications.on("clearall", this.deactivateReminder);
        LocalNotifications.on("cancel", this.deactivateReminder);
        LocalNotifications.on("cancelall", this.deactivateReminder);
        LocalNotifications.on("click", this.deactivateReminder);
    }

    private deactivateReminder = (notification, state) => {
        let query = "UPDATE reminders SET active = 0 WHERE id = (?)";
        let params = [notification.id];
        this.dbService.exec(query, params).then((res) => {
            this.sync();
        }, this.err);
    }

    private triggerCallback = (geofences) => {
        geofences.forEach((geo) => {
            console.log(geo);
            console.log(geo.id);
            this.locationService.getReminder(geo.id).then((reminder: any) => {
                LocalNotifications.schedule({
                    id: reminder[0].id,
                    title: reminder[0].name,
                    text: reminder[0].note,
                    data: reminder[0]
                });
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