import {Component, ElementRef, ViewChild, OnInit, AfterViewInit} from '@angular/core';
import {IonicPage, App} from 'ionic-angular';
import {ServiceHelper} from '../../../providers/service-helper';
import {ServiceBible} from '../../../providers/service-bible';
import {ServiceStorage} from '../../../providers/atom/service-storage';
import {TABLE} from '../../../configs';
import {IBookmarkHistory} from '../../../types/bible';

@IonicPage({
  name: 'tab-bookmark'
})
@Component({
  templateUrl: 'tab-bookmark.html',
})
export class TabBookmarkPage implements OnInit, AfterViewInit {

  public items: IBookmarkHistory[];
  public isHideDeleteBtn = true;

  @ViewChild('skinContent', {read: ElementRef}) skinContent: ElementRef;

  constructor(private appCtrl: App,
              private serviceHelper: ServiceHelper,
              private serviceBible: ServiceBible,
              private serviceStorage: ServiceStorage) {

    this.items = this.serviceStorage.bookmarkArr;
  }

  ngOnInit(): void {
    this.serviceHelper.trackPage('Bookmark_Tab_page');
  }

  ngAfterViewInit(): void {
    this.items.map(item => item.bookName = this.serviceBible.theBible.bookIndex[item.book].name);
  }

  ionViewWillEnter() {
    this.loadingBookNames();
  }

  loadingBookNames() {
    for (const item of this.items) {
      const theBook = this.serviceBible.theBible.bookIndex[item.book];
      if (theBook)
        item.bookName = theBook.name;
    }
  }

  onclick_clearAll() {
    const title = 'Delete all Bookmarks ?';
    const message = 'Once deleted, all your bookmarks will be gone.';
    this.serviceStorage.presentConfirm(title, message,
      () => this.serviceStorage.deleteAllBookmarkHistory(TABLE.BOOKMARK));
  }

  onclick_delete = (item: IBookmarkHistory) =>
    this.serviceStorage.deleteBookmarkHistory(TABLE.BOOKMARK, item.book, item.chapter);

  onclick_toggleDelete() {
    this.isHideDeleteBtn = !this.isHideDeleteBtn;
  }

  onclick_read(item: IBookmarkHistory) {
    this.serviceBible.theBible.selectedBook = item.book;
    this.serviceBible.theBible.resetSelectedChapter(item.chapter);
    this.appCtrl.getRootNav().push('chapter-detail');
  }

}
