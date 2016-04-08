import {Page, NavController} from 'ionic-angular';
import {ListService} from '../../services/listService';
import {LocationService} from '../../services/locationService';
import {ListDirective} from '../../services/directives/list';

@Page({
    templateUrl: 'build/pages/lists/lists.html',
    directives: [ListDirective]
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
}
