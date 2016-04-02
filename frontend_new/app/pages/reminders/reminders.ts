import {Page, NavController} from 'ionic-angular';
import {CreateReminder} from './create/createReminder';
import {ReminderService} from '../../services/reminderService';

@Page({
    templateUrl: 'build/pages/reminders/reminders.html'
})
export class Reminders {
    reminders = [];
    expandedId: number = -1;

    constructor(private nav: NavController, private reminderService: ReminderService) {
        this.reminderService.get().then((reminders) => {
            this.reminders = reminders;
        })
    }

    create() {
        this.nav.push(CreateReminder);
    }

    expand(reminder) {
        if (this.expandedId == reminder.id) {
            this.expandedId = -1;
        } else {
            this.expandedId = reminder.id;
        }
    }
}
