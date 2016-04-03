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
    form = {
        name: "",
        note: "",
        list: {
            id:-1
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

    selectList() {
        this.listService.getAll().then((lists) => {
            let alert = Alert.create();
            alert.setTitle('Choose list');
            lists.forEach((list, index) => {
                alert.addInput({
                    type: 'radio',
                    label: list.name,
                    value: list,
                    checked: index == 0
                });
            })
            alert.addButton({
                text: 'Ok',
                handler: data => {
                    this.form.list = data;
                }
            });
            this.nav.present(alert);
        });
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
        this.reminderService.add(reminder);
        this.nav.setRoot(Reminders);
    }
}
