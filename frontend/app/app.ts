import {App, Platform, IonicApp, MenuController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {Reminders} from './pages/reminders/reminders';
import {Settings} from './pages/settings/settings';
import {Lists} from './pages/lists/lists';

import {LocationService} from './services/locationService';
import {ListService} from './services/listService';
import {DbService} from './services/dbService';
import {ReminderService} from './services/reminderService';
import {GeofenceService} from './services/geofenceService';

declare var window: any;

@App({
    templateUrl: 'build/app.html',
    config: {}, // http://ionicframework.com/docs/v2/api/config/Config/
    providers: [DbService, ListService, LocationService, ReminderService, GeofenceService]
})
export class MyApp {
    rootPage = Reminders;
    settings = Settings;
    locations = Lists;

    constructor(private app: IonicApp, private menu: MenuController, platform: Platform, private geofenceService: GeofenceService) {
        platform.ready().then(() => {
            StatusBar.styleDefault();
            this.geofenceService.init();
        });
    }

    goPage(page) {
        this.menu.close();
        let nav = this.app.getComponent('nav');
        nav.setRoot(page);
    }
}
