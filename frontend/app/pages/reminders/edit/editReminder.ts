import {Page, NavController, Alert, NavParams, Platform} from 'ionic-angular';
import {ListService} from '../../../services/listService';
import {ReminderService, Reminder} from '../../../services/reminderService';
import {CreateList} from '../../lists/create/createList';
import {Reminders} from '../reminders';
import {SearchSelectList} from '../create/selectList/searchSelectList';

@Page({
    templateUrl: 'build/pages/reminders/create/createReminder.html'
})
export class EditReminder {
    items = [];
    lists = [];
    form: any;
    title = "Edit";

    constructor(
        private nav: NavController,
        private listService: ListService,
        private reminderService: ReminderService,
        private platform: Platform,
        private navParams: NavParams) {
        this.form = this.navParams.get("form");
        if (!this.form.list.id) {
            this.listService.get(this.form.list).then((list) => {
                this.form.list = list[0];
            });
        }
    }

    selectList() {
        if (this.platform.is("ios")) {
            this.nav.push(SearchSelectList, { form: this.form, edit: true });
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

            alert.addButton({
                text: 'Create',
                handler: data => {
                    this.nav.push(CreateList, {form: this.form, editReminder: true });
                }
            });

            alert.addButton({
                text: 'OK',
                handler: data => {
                    if (data) {
                        this.form.list = data;
                    }
                }
            });

            this.nav.present(alert);
        });
    }

    submit() {
        let reminder: Reminder = {
            list: this.form.list.id,
            note: this.form.note,
            name: this.form.name,
            volume: this.form.volume,
            active: 1
        }
        this.reminderService.edit(this.form.id, reminder).then(() => {
            this.nav.setRoot(Reminders);
        });
    }
}
