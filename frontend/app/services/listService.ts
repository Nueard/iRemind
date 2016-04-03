import {DbService} from './dbService';
import {LocationService} from './locationService';
import {Injectable} from 'angular2/core';
import {Location} from './locationService';
import {GeofenceService} from './geofenceService';

export interface List {
    name: string,
    locations: Array<Location>,
    favourite: number
}

@Injectable()
export class ListService {
    constructor(
        private dbService       : DbService,
        private locationService : LocationService,
        private geofenceService : GeofenceService) { }

    add(list: List) {
        var query = "INSERT INTO lists (name, favourite) VALUES (?,?)";
        var params = [list.name, list.favourite];
        this.dbService.exec(query, params).then((res) => {
            this.locationService.batchAdd(list.locations, res.res.id);
        }, this.err);
    }

    edit(id: number, locations: Array<Location>) {
        let query = "DELETE FROM locations WHERE list = (?)";
        let params = [id];
        this.dbService.exec(query, params).then((res) => {
            this.locationService.batchAdd(locations, id).then(() => {
                this.geofenceService.sync();
            });
        }, this.err);
    }

    setFavourite(id: number, favourite: number) {
        let query = "UPDATE lists SET favourite = (?) WHERE id = (?)";
        let params = [favourite, id];
        this.dbService.exec(query, params).then(
            (res) => { },
            this.err);
    }

    getFavourites() {
        let query = "SELECT * FROM lists WHERE favourite = (?)";
        let params = [1]
        return this.dbService.exec(query, params).then(this.getResults, this.err);
    }

    del(id: number) {
        var query = "DELETE FROM lists WHERE id = ?";
        let params = [id];
        this.dbService.exec(query, params).then((succ) => {
            this.geofenceService.sync();
        }, this.err);
    }

 

    getAll() {
        let query = "SELECT * FROM lists";
        return this.dbService.exec(query, []).then(this.getResults, this.err);
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
