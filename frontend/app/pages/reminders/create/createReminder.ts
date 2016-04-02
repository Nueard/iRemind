import {Page, NavController, NavParams} from 'ionic-angular';
import {SelectList} from './selectList/selectList';
import {ReminderService, Reminder} from '../../../services/reminderService';
import {Reminders} from '../reminders';

@Page({
    templateUrl: 'build/pages/reminders/create/createReminder.html'
})
export class CreateReminder {
    items = [];
    form = {
        name: "",
        note: "",
        list: {
            id:-1
        },
        radius: 50,
        volume: 50
    };
    constructor(private nav: NavController, private reminderService: ReminderService, navParams: NavParams) {
        if (navParams.get("form")) {
            this.form = navParams.get("form");
        }
    }

    selectList() {
        this.nav.push(SelectList, { form: this.form });
    }

    create() {
        let reminder: Reminder = {
            list: this.form.list.id,
            note: this.form.note,
            name: this.form.name,
            radius: this.form.radius,
            volume: this.form.volume,
            active: 1,
            favourite: 0
        }
        this.reminderService.add(reminder).then((res) => { console.log(res); });
        this.nav.setRoot(Reminders);
    }
}
