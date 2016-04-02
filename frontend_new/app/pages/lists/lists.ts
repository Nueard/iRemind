import {Page, NavController} from 'ionic-angular';
import {CreateList} from './create/createList';
import {ListService} from '../../services/listService';

@Page({
    templateUrl: 'build/pages/lists/lists.html'
})
export class Lists {
    lists = [];

    constructor(private nav: NavController, private listService: ListService) {
        this.listService.getAll().then((lists) => {
            this.lists = lists;
        });
    }

    onPageDidEnter() {
    }

    create() {
        this.nav.push(CreateList);
    }
}
