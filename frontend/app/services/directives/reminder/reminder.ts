import {Component, Input} from 'angular2/core';
import {NavController, Platform} from 'ionic-angular';

import {EditReminder} from '../../../pages/reminders/edit/editReminder';
import {EditList} from '../../../pages/lists/edit/editList';

import {ReminderService} from '../../reminderService';
import {ListService} from '../../listService';
import {LocationService} from '../../locationService';
import {CreateReminder} from '../../../pages/reminders/create/createReminder';
import {MaxLengthPipe} from '../../pipes/maxLength.pipe';
import {MapDirective} from '../map/map';
import {IONIC_DIRECTIVES} from 'ionic-angular/config/directives';

@Component({
    selector: '[ir-reminder]',
    templateUrl: 'build/services/directives/reminder/reminder.html',
    pipes: [MaxLengthPipe],
    directives: [IONIC_DIRECTIVES, MapDirective]
})
export class ReminderDirective {

    @Input('ir-reminder') reminder: any;
    list: any;

    constructor(
        private nav: NavController,
        private reminderService: ReminderService,
        private listService: ListService,
        private locationService: LocationService,
        platform: Platform) {
        platform.ready().then(() => {
            this.listService.get(this.reminder.list).then((list: any) => {
                this.reminder.listName = list[0].name;
                this.list = list[0];
            });
        });
    }

    edit() {
        this.nav.push(EditReminder, { form: this.reminder });
    }

    editList() {
        // this.locationService.getByList(this.list.id).then((locations) => {
        //     this.list.locations = locations;
        //     this.nav.push(EditList, { list: this.list });
        // })
    }

    expand() {
        this.locationService.getByList(this.reminder.list).then((locations) => {
            this.reminder.locations = locations;
            this.reminder.showMap = !this.reminder.showMap;
        })
    }

    toggleActive = () => {
        this.reminder.activeb = !this.reminder.activeb;
        this.reminderService.setActive(this.reminder.id, this.reminder.activeb ? 1 : 0);
    }
}
