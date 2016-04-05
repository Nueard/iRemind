import {Page, NavController, NavParams, Alert} from 'ionic-angular';
import {CreateReminder} from '../createReminder';
import {CreateList} from '../../../lists/create/createList';
import {Reminders} from '../../reminders';
import {ListService} from '../../../../services/listService';

@Page({
    templateUrl: 'build/pages/reminders/create/selectSelectList/selectList.html'
})
export class SelectList {
    form: any;

    constructor(private nav: NavController, private listService: ListService, navParams: NavParams) {
        this.form = navParams.get("form");

        this.listService.getAll().then((lists) => {
            let alert = Alert.create();
            alert.setTitle('Lightsaber color');

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
                        this.nav.setPages([
                            {
                                page: Reminders
                            }, {
                                page: CreateReminder,
                                params: { form: this.form }
                            }]);
                    }
                }
            });

            this.nav.present(alert);
        });
    }
}