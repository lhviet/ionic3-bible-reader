import {Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import {IonicPage, App} from 'ionic-angular';
import {ServiceHelper} from '../../../providers/service-helper';
import {ServiceStorage} from '../../../providers/atom/service-storage';
import {TABLE} from '../../../configs';
import {IBookmarkHistory} from '../../../types/bible';
import {ServiceBible} from '../../../providers/service-bible';
import {HistoryListComponent} from '../../../components/history-list/history-list';

@IonicPage({
  name: 'tab-history'
})
@Component({
  templateUrl: 'tab-history.html',
})
export class TabHistoryPage implements OnInit {

  @ViewChild('skinContent', {read: ElementRef}) skinContent: ElementRef;
  @ViewChild(HistoryListComponent) history: HistoryListComponent;

  constructor(private appCtrl: App,
              private serviceBible: ServiceBible,
              private serviceHelper: ServiceHelper,
              private serviceStorage: ServiceStorage) {
  }

  ngOnInit(): void {
    this.serviceHelper.trackPage('History_Tab_page');
  }

  ionViewWillEnter() {
    this.history.loadingBookNames();
  }

  onclick_clearAll() {
    const title = 'Delete all Histories ?';
    const message = 'Once deleted, all your histories will be gone.';
    this.serviceStorage.presentConfirm(title, message,
      () => this.serviceStorage.deleteAllBookmarkHistory(TABLE.HISTORY));
  }

  click_restoreHistory(item: IBookmarkHistory) {
    this.serviceBible.theBible.selectedBook = item.book;
    this.serviceBible.theBible.resetSelectedChapter(item.chapter);
    this.appCtrl.getRootNav().push('chapter-detail');
  }
}
