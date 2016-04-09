import {App, Platform, IonicApp, MenuController, NavController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {CreateReminder} from './pages/reminders/create/createReminder';
import {Settings} from './pages/settings/settings';
import {Geolocation} from 'ionic-native';

import {LocationService} from './services/locationService';
import {ListService} from './services/listService';
import {DbService} from './services/dbService';
import {ReminderService} from './services/reminderService';
import {GeofenceService} from './services/geofenceService';
import {TabsPage} from './pages/tabs/tabs';

import {enableProdMode} from 'angular2/core';
enableProdMode();

declare var window: any;
declare var navigator: any;
declare var cordova: any;

@App({
    templateUrl: 'build/app.html',
    config: {
        clickBlock: false
    },
    providers: [GeofenceService, DbService, ReminderService, ListService, LocationService]
})
export class MyApp {
    rootPage = TabsPage;
    settings = Settings;
    lists = [];

    constructor(
        private app: IonicApp,
        private menu: MenuController,
        private geofenceService: GeofenceService,
        private listService: ListService,
        private reminderService: ReminderService,
        platform: Platform) {
        platform.ready().then(() => {
            StatusBar.styleDefault();
            Geolocation.getCurrentPosition();
            if (window.geofence != undefined) {
                this.geofenceService.init();
            };
            this.listService.getFavourites().then((lists) => {
                this.lists = lists;
            });
            if (platform.is("ios")) {
                this.menu.swipeEnable(false);
            }
            
            
                var actions = [{
                    identifier: 'SIGN_IN',
                    title: 'Yes',
                    activationMode: 'background',
                    destructive: false,
                    authenticationRequired: true
                }];

                cordova.plugins.notification.local.schedule({
                    id: 1,
                    title: "Test",
                    text: "YOLO",
                    actions: actions
                });
            
            
            
        });

        document.addEventListener('backbutton', () => {
            let nav = this.app.getComponent('nav');
            if (!nav.canGoBack()) {
                return navigator.app.exitApp();
            }
            return nav.pop();
        }, false);
    }

    goPage(page) {
        let nav = this.app.getComponent('nav');
        this.menu.close();
        nav.setRoot(page);
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
        let nav = this.app.getComponent('nav');
        nav.push(CreateReminder, { form: form });
    }
}
