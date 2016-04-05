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
            reminders.forEach((reminder, index) => {
                reminders[index].active = reminder.active == 1;
            });
            this.reminders = reminders;
        });
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

    toggleActive = (reminder) => {
        reminder.active = !reminder.active;
        this.reminderService.setActive(reminder.id, reminder.active ? 1 : 0);
    }
}
