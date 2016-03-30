import {Page, NavController, NavParams} from 'ionic-angular';
import {SelectList} from './selectList/selectList';

@Page({
    templateUrl: 'build/pages/reminders/create/createReminder.html'
})
export class CreateReminder {
    nav: any;
    items = [];
    form = {};
    constructor(nav: NavController, navParams: NavParams) {
        this.nav = nav;
        if(navParams.get("form")) {
            this.form = navParams.get("form");
        } else {
            this.form = {
                name: "",
                note: "",
                location: "",
                radius: 50,
                notification: 50
            }
        }
    }

    selectList() {
        this.nav.push(SelectList, {form:this.form});
    }
}
