import {DbService} from './dbService';
import {LocationService} from './locationService';
import {Injectable} from 'angular2/core';
import {Location} from './locationService';

export interface List {
    name: string,
    locations: Array<Location>
}

@Injectable()
export class ListService {
    constructor(private dbService: DbService, private locationService: LocationService) { }

    add(list: List) {
        var query = "INSERT INTO lists (name) VALUES (?)";
        var params = [list.name];
        var res = this.dbService.exec(query, params)
            .then((res) => {
                list.locations.forEach((location) => {
                    location.list = res.res.insertId;
                    this.locationService.add(location);
                })
            }, (err) => {
                console.error(err);
            })
    }

    edit(id: number, locations: Array<Location>) {
        let query = "DELETE FROM locations WHERE list = (?)";
        let params = [id];
        var res = this.dbService.exec(query, params);
        res.then(function(res) {
            locations.forEach(function(location) {
                location.list = id;
                this.locationService.add(location);
            })
        }, function(err) {
            console.error(err);
        })
    }

    del(id: number) {
        var query = "DELETE FROM lists WHERE id = " + id;
        return this.dbService.exec(query, []).then(this.getResults);
    }

    get(q: string) {
        let query = "SELECT * FROM lists WHERE name LIKE '%" + q + "%'";
        return this.dbService.exec(query, []).then(this.getResults);
    }

    getAll() {
        let query = "SELECT * FROM lists";
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
