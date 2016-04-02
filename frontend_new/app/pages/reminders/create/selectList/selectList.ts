import {Page, NavController, NavParams} from 'ionic-angular';
import {CreateReminder} from '../createReminder';
import {Reminders} from '../../reminders';
import {ListService} from '../../../../services/listService';

@Page({
    templateUrl: 'build/pages/reminders/create/selectList/selectList.html'
})
export class SelectList {
    items = [];
    lists = [];
    searchbar: any = "";
    form : any;
    inpt: any;

    constructor(private nav: NavController, private listService: ListService, navParams: NavParams) {
        this.listService.getAll().then((lists) => {
            this.lists = lists;
            this.items = lists;
        });
        this.form = navParams.get("form");
    }

    getItems(searchbar) {
        var q = searchbar.value;

        if (q.trim() == '') {
            this.items = this.lists;
            return;
        }

        this.items = this.lists.filter((v) => {
            if (v.name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                return true;
            }
            return false;
        })
    }

    selectLocation(list) {
        this.form.list = list;
        this.nav.setPages([{
            page: Reminders
        }, {
            page: CreateReminder,
            params: {form: this.form}
        }])
    }

    onCancel(searchbar) {
        this.nav.pop();
    }
}
