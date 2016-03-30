import {Page, NavController} from 'ionic-angular';
import {CreateLocation} from './create/createLocation';

@Page({
  templateUrl: 'build/pages/locations/locations.html'
})
export class Locations {
    nav: any;
    constructor(nav: NavController){
        this.nav = nav;
    }

    create() {
        this.nav.push(CreateLocation);
    }
}
