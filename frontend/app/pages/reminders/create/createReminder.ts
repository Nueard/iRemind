import {Page, NavController, Alert, NavParams, Platform} from 'ionic-angular';
import {ListService} from '../../../services/listService';
import {ReminderService, Reminder} from '../../../services/reminderService';
import {Reminders} from '../reminders';
import {SearchSelectList} from './selectList/searchSelectList';
import {SelectSelectList} from './selectList/selectSelectList';

@Page({
    templateUrl: 'build/pages/reminders/create/createReminder.html'
})
export class CreateReminder {
    items = [];
    lists = [];
    form = {
        name: "",
        note: "",
        list: {
            id: -1
        },
        volume: 50
    };

    constructor(
        private nav: NavController,
        private listService: ListService,
        private reminderService: ReminderService,
        private platform: Platform,
        navParams: NavParams) {
        if (navParams.get("form")) {
            this.form = navParams.get("form");
            console.log(this.form);
        }
        this.listService.getAll().then((lists) => {
            this.lists = lists;
        });
    }

    selectList() {
        if (this.platform.is("android")) {
            this.nav.push(SelectSelectList, { form: this.form });
        } else if (this.platform.is("ios")) {
            this.nav.push(SearchSelectList, { form: this.form });
        } else {
            this.nav.push(SelectSelectList, { form: this.form });
        }
    }

    create() {
        let reminder: Reminder = {
            list: this.form.list.id,
            note: this.form.note,
            name: this.form.name,
            volume: this.form.volume,
            active: 1
        }
        this.reminderService.add(reminder).then(() => {
            this.nav.setRoot(Reminders);
        });
    }
}
