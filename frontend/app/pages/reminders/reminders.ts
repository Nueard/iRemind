import {Page, NavController} from 'ionic-angular';
import {CreateReminder} from './create/createReminder';
import {EditReminder} from './edit/editReminder';
import {ReminderService} from '../../services/reminderService';
import {ReminderDirective} from '../../services/directives/reminder/reminder';

@Page({
    templateUrl: 'build/pages/reminders/reminders.html',
    directives: [ReminderDirective]
})
export class Reminders {
    reminders = [];
    expandedId: number = -1;
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
        private reminderService: ReminderService) {
        this.reminderService.get().then((reminders) => {
            reminders.forEach((reminder, index) => {
                reminders[index].activeb = reminder.active == 1;
                reminders[index].showMap = false;
            });
            this.reminders = reminders;
        });
    }
}
