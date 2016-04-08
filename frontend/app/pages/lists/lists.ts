import {Page, NavController} from 'ionic-angular';
import {CreateList} from './create/createList';
import {EditList} from './edit/editList';
import {ListService} from '../../services/listService';
import {LocationService} from '../../services/locationService';

@Page({
    templateUrl: 'build/pages/lists/lists.1.html'
})
export class Lists {
    lists = [];

    constructor(
        private nav: NavController,
        private listService: ListService,
        private locationService: LocationService) {
        this.listService.getAll().then((lists) => {
            this.lists = lists;
        });
    }

    toggleFavourite(list) {
        list.favourite = Math.abs(list.favourite - 1);
        this.listService.setFavourite(list.id, list.favourite);
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
}
