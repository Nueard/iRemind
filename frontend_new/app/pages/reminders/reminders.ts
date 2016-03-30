import {Page, NavController} from 'ionic-angular';
import {CreateReminder} from './create/createReminder';

@Page({
  templateUrl: 'build/pages/reminders/reminders.html'
})
export class Reminders {
    nav: any;

    constructor(nav: NavController){
        this.nav = nav;
    }

    createReminder() {
        this.nav.push(CreateReminder);
    }
}
