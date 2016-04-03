import {Page, NavController, Alert, NavParams} from 'ionic-angular';
import {ListService} from '../../../services/listService';
import {ReminderService, Reminder} from '../../../services/reminderService';
import {Reminders} from '../reminders';

@Page({
    templateUrl: 'build/pages/reminders/create/createReminder.html'
})
export class CreateReminder {
    items = [];
    lists = [];
    selectedList: any;
    form = {
        name: "",
        note: "",
        list: {
            id: -1
        },
        radius: 50,
        volume: 50
    };
    
    constructor(private nav: NavController, private listService: ListService, private reminderService: ReminderService, navParams: NavParams) {
        if (navParams.get("form")) {
            this.form = navParams.get("form");
        }
        this.listService.getAll().then((lists) => {
            this.lists = lists;
        });
    }

    create() {
        let id = -1;
        if(this.selectedList) {
            id = this.selectedList.id;
        } else {
            id = this.form.list.id;
        }
        let reminder: Reminder = {
            list: id,
            note: this.form.note,
            name: this.form.name,
            radius: this.form.radius,
            volume: this.form.volume,
            active: 1
        }
        this.reminderService.add(reminder);
        this.nav.setRoot(Reminders);
    }
}
