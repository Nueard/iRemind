import {Page, NavController} from 'ionic-angular';
import {CreateReminder} from './create/createReminder';
import {EditReminder} from './edit/editReminder';
import {ReminderService} from '../../services/reminderService';

@Page({
    templateUrl: 'build/pages/reminders/reminders.html'
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

    constructor(private nav: NavController, private reminderService: ReminderService) {
        this.reminderService.get().then((reminders) => {
            reminders.forEach((reminder, index) => {
                reminders[index].activeb = reminder.active == 1;
            });
            this.reminders = reminders;
        });
    }

    create() {
        this.nav.push(CreateReminder);
    }
    
    edit(reminder) {
        this.nav.push(EditReminder, {form: reminder});
    }

    expand(reminder) {
        if (this.expandedId == reminder.id) {
            this.expandedId = -1;
        } else {
            this.expandedId = reminder.id;
            this.form.name = reminder.name;
            this.form.note = reminder.note;
            this.form.volume = reminder.volume;
        }
    }

    toggleActive = (reminder) => {
        reminder.activeb = !reminder.activeb;
        this.reminderService.setActive(reminder.id, reminder.activeb ? 1 : 0);
    }
}
