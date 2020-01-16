import {Component, ViewChild} from '@angular/core';
import {IonicPage, Tabs} from 'ionic-angular';
import {ServiceHelper} from '../../providers/service-helper';

@IonicPage({
  name: 'bookmark-history'
})
@Component({
  templateUrl: 'bookmark-history.html',
})
export class BookmarkHistoryPage {

  @ViewChild('historyBookmarkTabs') tabRef: Tabs;

  tab_history = 'tab-history';
  tab_bookmark = 'tab-bookmark';

  constructor(
    private serviceHelper: ServiceHelper
  ) {
  }

  ionViewWillEnter() {
    const tabHistory = this.tabRef.getByIndex(0);
    tabHistory.getActive()._willEnter();
    this.serviceHelper.showAdmobInterstitial();
  }

}
