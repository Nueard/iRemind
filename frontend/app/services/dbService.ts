import {Storage, SqlStorage} from 'ionic-angular';
import {Injectable} from 'angular2/core';

@Injectable()
export class DbService {
    db: Storage = null;
    createQueries: Array<string>;
    deleteQueries: Array<string>;

    constructor() {
        this.db = new Storage(SqlStorage, { name: 'iremind' });
        this.createQueries = [
            "CREATE TABLE IF NOT EXISTS locations (id integer primary key, list int, latitude real, longitude real, name text)",
            "CREATE TABLE IF NOT EXISTS lists (id integer primary key, name text, favourite int)",
            "CREATE TABLE IF NOT EXISTS reminders (id integer primary key, list int, name text, note text, radius int, volume int, active int)"
        ];
        this.deleteQueries = [
            "DROP TABLE IF EXISTS locations",
            "DROP TABLE IF EXISTS lists",
            "DROP TABLE IF EXISTS reminders"];
        this.createQueries.forEach((query) => {
            this.db.query(query);
        })
    }

    exec(query, params) {
        if (this.db != null) {
            return this.db.query(query, params);
        } else {
            console.error("Database not initialised, but querried");
            return null;
        }
    }

    wipe() {
        this.deleteQueries.forEach((query) => {
            let promises = [];
            promises.push(this.db.query(query));
            Promise.all(promises).then(() => {
                this.createQueries.forEach((query) => {
                    this.db.query(query);
                });
            });
        });
    }
}
