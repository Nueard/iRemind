import {Page, NavController, Platform, NavParams} from 'ionic-angular';
import {ListService, List} from '../../../../services/listService';
import {Reminders} from '../../../reminders/reminders';
import {CreateReminder} from '../../../reminders/create/createReminder';
import {EditReminder} from '../../../reminders/edit/editReminder';
import {Lists} from '../../lists';

declare var google: any;

@Page({
    templateUrl: 'build/pages/lists/create/modalConfirm/modalConfirm.html'
})
export class ModalConfirm {
    locations = [];
    name = "";

    constructor(
        private platform: Platform,
        private nav: NavController,
        private navParams: NavParams,
        private listService: ListService) {
        this.locations = this.navParams.get("locations");
    }

    save() {
        let list = {
            locations: this.locations,
            name: this.name,
            favourite: 0
        }
        this.listService.add(list).then((res) => {
            if (this.navParams.get("createReminder") || this.navParams.get("editReminder")) {
                this.listService.get(res.res.insertId).then((l) => {
                    this.nav.setRoot(Reminders);
                    let page;
                    if (this.navParams.get("createReminder")) {
                        page = CreateReminder;
                    } else {
                        page = EditReminder;
                    }
                    let f = this.navParams.get("form");
                    f.list = l[0];
                    this.nav.push(page, {
                        form: f
                    });
                });
            } else {
                this.nav.setRoot(Lists);
            }
        });
    }
}
