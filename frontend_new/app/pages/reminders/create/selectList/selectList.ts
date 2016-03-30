import {Page, NavController, NavParams} from 'ionic-angular';
import {CreateReminder} from '../createReminder';
import {Reminders} from '../../reminders';

@Page({
    templateUrl: 'build/pages/reminders/create/selectList/selectList.html'
})
export class SelectList {
    nav: any;
    items = [];
    initItems = [];
    searchQuery = '';
    form : any;

    constructor(nav: NavController, navParams: NavParams) {
        this.nav = nav;
        this.initItems = ['joro', 'e', 'gei', 'i', 'lapa', 'pishki'];
        this.initialiseItems();
        this.form = navParams.get("form");
    }

    initialiseItems() {
        this.items = this.initItems;
    }

    getItems(searchbar) {
        this.initialiseItems();

        var q = searchbar.value;

        if (q.trim() == '') {
            return;
        }

        this.items = this.items.filter((v) => {
            if (v.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                return true;
            }
            return false;
        })
    }

    selectLocation(location) {
        this.form.location = location;
        this.nav.setPages([{
            page: Reminders
        }, {
            page: CreateReminder,
            params: {form: this.form}
        }])
    }
}
