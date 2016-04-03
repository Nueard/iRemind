import {Injectable} from 'angular2/core';
import {DbService} from './dbService';

export interface Reminder {
    list: number,
    name: string,
    note: string,
    radius: number,
    volume: number,
    active: number
}

@Injectable()
export class ReminderService {
    constructor(private dbService: DbService) { }

    add(reminder) {
        var query =
            "INSERT INTO reminders (list, name, note, radius, volume, active) VALUES (?,?,?,?,?,?)";
        var params = [reminder.list, reminder.name, reminder.note, reminder.radius, reminder.volume, reminder.active];
        this.dbService.exec(query, params).then(() => {}, this.err);;
    }

    get() {
        var query = "SELECT * FROM reminders";
        return this.dbService.exec(query, []).then(this.getResults, this.err);
    }

    del(id) {
        var query = "DELETE FROM reminders WHERE id = " + id;
        this.dbService.exec(query, []).then(() => {}, this.err);;
    }

    setActive(id, active) {
        var query = "UPDATE reminders SET active = " + active + " WHERE id = " + id;
        this.dbService.exec(query, []).then(() => {}, this.err);
    }

    getResults = (response) => {
        var data = [];
        for (var i = 0; i < response.res.rows.length; i++) {
            data.push(response.res.rows.item(i));
        }
        return data;
    }

    err(err) {
        console.error(err);
    }
}