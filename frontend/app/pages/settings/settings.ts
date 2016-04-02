import {Page, NavController} from 'ionic-angular';
import {DbService} from '../../services/dbService';
import {GeofenceService} from '../../services/geofenceService';
import {LocationService} from "../../services/locationService";


@Page({
    templateUrl: 'build/pages/settings/settings.html'
})
export class Settings {
    constructor(private nav: NavController, private dbService: DbService, private geofenceService: GeofenceService, private locationService: LocationService) { }

    wipe() {
        this.dbService.wipe();
    }
    
    sync() {
        this.geofenceService.sync();
    }
}
