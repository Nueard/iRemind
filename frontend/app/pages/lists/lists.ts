import {Page, NavController} from 'ionic-angular';
import {CreateList} from './create/createList';
import {CreateReminder} from '../reminders/create/createReminder';
import {EditList} from './edit/editList';
import {ListService} from '../../services/listService';
import {LocationService} from '../../services/locationService';
import {MaxLengthPipe} from '../../services/pipes/maxLength.pipe';

@Page({
    templateUrl: 'build/pages/lists/lists.1.html',
    pipes: [MaxLengthPipe]
})
export class Lists {
    lists = [];

    constructor(
        private nav: NavController,
        private listService: ListService,
        private locationService: LocationService) {
        this.listService.getAll().then((lists) => {
            lists.forEach((list, index) => {
                lists[index].favouriteb = list.favourite == 1;
                this.locationService.getByList(list.id).then((locations) => {
                    list.numLocations = locations.length; 
                });
                list.showMap = false;
            })
            this.lists = lists;
        });
    }

    toggleFavourite(list) {
        list.favouriteb = !list.favouriteb;
        this.listService.setFavourite(list.id, list.favouriteb ? 1 : 0);
    }

    create() {
        this.nav.push(CreateList);
    }

    edit(list) {
        this.locationService.getByList(list.id).then((locations) => {
            list.locations = locations;
            this.nav.push(EditList, { list: list });
        });
    }
    
    showMap(list) {
        list.showMap = !list.showMap;
    }

    createReminder(list) {
        let form = {
            name: "",
            note: "",
            list: list,
            radius: 50,
            volume: 50
        }
        this.nav.push(CreateReminder, { form: form });
    }
}
