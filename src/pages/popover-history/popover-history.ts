import {Component, OnInit} from '@angular/core';
import {App, IonicPage, ViewController} from 'ionic-angular';
import {ServiceHelper} from '../../providers/service-helper';
import {IBookmarkHistory} from '../../types/bible';
import {ServiceBible} from '../../providers/service-bible';

@IonicPage({
  name: 'popover-history'
})
@Component({
  templateUrl: './popover-history.html',
})
export class PopoverHistoryPage implements OnInit {

  constructor(private viewCtrl: ViewController,
              private appCtrl: App,
              private serviceBible: ServiceBible,
              private serviceHelper: ServiceHelper) {
  }

  ngOnInit(): void {
    this.serviceHelper.trackPage('History_popover');
  }

  onclick_history() {
    this.viewCtrl.dismiss();
    this.appCtrl.getRootNav().push('bookmark-history');
  }

  click_restoreHistory(item: IBookmarkHistory) {
    this.serviceBible.theBible.selectedBook = item.book;
    this.serviceBible.theBible.resetSelectedChapter(item.chapter);
    this.viewCtrl.dismiss(true);
  }
}
