import {DbService} from './dbService';
import {Injectable} from 'angular2/core';

export interface Location {
    list: number,
    latitude: number,
    longitude: number,
    name: string
}

@Injectable()
export class LocationService {

    constructor(private dbService: DbService) {
    }

    add(location) {
        console.log(location);
        var query =
            "INSERT INTO locations (list, latitude, longitude, name) VALUES (?,?,?,?)";
        var params = [location.list, location.latitude, location.longitude,
            location.name
        ];
        this.dbService.exec(query, params).then(
            (res) => { console.log(res); },
            (err) => { console.error(err); }
        );
    }

    get(id: number) {
        let query = "";
        if (id != -1) {
            query = "SELECT * FROM locations WHERE list = " + id;
        } else {
            query = "SELECT * FROM locations";
        }
        return this.dbService.exec(query, []).then(this.getResults);
    }

    getByList(id) {
        let query = "SELECT * FROM locations WHERE list = " + id;
        return this.dbService.exec(query, []).then(this.getResults);
    }

    getActive() {
        let query = "SELECT * FROM reminders JOIN locations ON locations.list = reminders.list WHERE active = 1";
        return this.dbService.exec(query, []).then(this.getResults);
    }

    getResults = (response) => {
        var data = [];
        for (var i = 0; i < response.res.rows.length; i++) {
            data.push(response.res.rows.item(i));
        }
        return data;
    }
}
