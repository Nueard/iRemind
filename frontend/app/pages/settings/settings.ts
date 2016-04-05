import {Page, NavController} from 'ionic-angular';
import {DbService} from '../../services/dbService';
import {GeofenceService} from '../../services/geofenceService';
import {LocationService} from '../../services/locationService';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';

@Page({
    templateUrl: 'build/pages/settings/settings.html'
})
export class Settings {
    locations = [];
    
    constructor(
        private nav: NavController,
        private dbService: DbService,
        private geofenceService: GeofenceService,
        private locationService: LocationService,
        private http: Http) {
            this.locationService.getActive().then((locations) => {
                this.locations = locations;
            });
         }

    wipe() {
        this.dbService.wipe();
    }

    sync() {
        this.geofenceService.sync();
    }

    test() {
        let body = JSON.stringify({ name: 'asd' });

        return this.http.post("http://82.25.173.240:1337/error", body).map(res => res.json()).subscribe(
            data => console.log(data),
            err => console.error(err),
            () => console.log('Movie Search Complete')
        );
    }
}
