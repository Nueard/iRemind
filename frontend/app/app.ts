import {App, Platform, IonicApp, MenuController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {Reminders} from './pages/reminders/reminders';
import {CreateReminder} from './pages/reminders/create/createReminder';
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
    lists = [];
    nav: any;

    constructor(private app: IonicApp, private menu: MenuController, platform: Platform, private geofenceService: GeofenceService, private listService: ListService) {
        platform.ready().then(() => {
            StatusBar.styleDefault();
            if (window.geofence != undefined) {
                this.geofenceService.init();
            }
            this.listService.getFavourites().then((lists) => {
                this.lists = lists;
            })
            this.nav = this.app.getComponent('nav');
        });
    }

    goPage(page) {
        this.menu.close();
        this.nav.setRoot(page);
    }
    
    createReminder(list) {
        let form = {
            name: "",
            note: "",
            list: list,
            radius: 50,
            volume: 50
        }
        this.menu.close();
        this.nav.push(CreateReminder,{form: form});
    }
}
