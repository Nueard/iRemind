import {Page} from 'ionic-angular';

import {Reminders} from '../reminders/reminders';
import {Lists} from '../lists/lists';
import {Settings} from '../settings/settings';



@Page({
    templateUrl: 'build/pages/tabs/tabs.html',
})
export class TabsPage {
    reminders = Reminders;
    locations = Lists;
    settings = Settings;
}
