import {Page, NavController} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/settings/settings.html'
})
export class Settings {
    nav: any;
    constructor(nav: NavController){
        this.nav = nav;
    }
}
