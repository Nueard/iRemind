import {Page, NavController} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/locations/locations.html'
})
export class Locations {
    nav: any;
    constructor(nav: NavController){
        this.nav = nav;
    }
}
