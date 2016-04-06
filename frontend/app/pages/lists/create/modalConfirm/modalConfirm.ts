import {Page, NavController, Platform, NavParams} from 'ionic-angular';
import {ListService, List} from '../../../../services/listService';
import {Reminders} from '../../../reminders/reminders';
import {CreateReminder} from '../../../reminders/create/createReminder';
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
            if (this.navParams.get("createReminder")) {
                this.listService.get(res.res.insertId).then((l) => {
                    this.nav.setRoot(Reminders);
                    this.nav.push(CreateReminder, {
                        form: {
                            name: "",
                            note: "",
                            volume: 50,
                            list: l[0]
                        }
                    });
                });
            } else {
                this.nav.setRoot(Lists);
            }
        });
    }
}
