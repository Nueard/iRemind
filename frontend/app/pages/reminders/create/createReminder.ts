import {Page, NavController, Alert, NavParams, Platform} from 'ionic-angular';
import {ListService} from '../../../services/listService';
import {ReminderService, Reminder} from '../../../services/reminderService';
import {CreateList} from '../../lists/create/createList';
import {Reminders} from '../reminders';
import {SearchSelectList} from './selectList/searchSelectList';

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
    title = "Create";

    constructor(
        private nav: NavController,
        private listService: ListService,
        private reminderService: ReminderService,
        private platform: Platform,
        private navParams: NavParams) {
        if (this.navParams.get("form")) {
            this.form = this.navParams.get("form");
        }
        this.listService.getAll().then((lists) => {
            this.lists = lists;
        });
    }

    selectList() {
        if (this.platform.is("ios")) {
            this.nav.push(SearchSelectList, { form: this.form });
        } else {
            this.showMaterialSelect();
        }
    }

    showMaterialSelect() {
        this.listService.getAll().then((lists) => {
            let alert = Alert.create();
            alert.setTitle('Choose locations');

            lists.forEach((list, index) => {
                alert.addInput({
                    type: 'radio',
                    label: list.name,
                    value: list,
                    checked: index == 0
                });
            });
            alert.addInput({
                type: 'radio',
                label: 'Create new',
                value: 'create'
            });

            alert.addButton({
                text: 'OK',
                handler: data => {
                    if (data == 'create') {
                        this.nav.push(CreateList, { createReminder: true });
                    } else {
                        this.form.list = data;
                    }
                }
            });

            this.nav.present(alert);
        });
    }

    submit() {
        if (this.form.name.trim().length == 0) {
            return;
        }
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
