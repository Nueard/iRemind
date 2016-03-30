import {App, Platform, IonicApp, MenuController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {Reminders} from './pages/reminders/reminders';
import {Settings} from './pages/settings/settings';
import {Locations} from './pages/locations/locations';


@App({
  templateUrl: 'build/app.html',
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
    rootPage = Reminders;
    settings = Settings;
    locations = Locations;
    app: any;
    menu: any;

    constructor(app :IonicApp, platform: Platform, menu: MenuController) {
        this.app = app;
        this.menu = menu;
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
        });
    }

    goPage(page) {
        this.menu.close();
        let nav = this.app.getComponent('nav');
        nav.setRoot(page);
    }
}
