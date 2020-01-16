import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ServiceStorage} from '../../providers/atom/service-storage';
import {IBookmarkHistory} from '../../types/bible';
import {ServiceBible} from '../../providers/service-bible';

@Component({
  selector: 'history-list',
  templateUrl: 'history-list.html',
})
export class HistoryListComponent {

  @Input() limit?: number;

  @Output() itemClick = new EventEmitter<IBookmarkHistory>();

  items: IBookmarkHistory[];
  bookmarks: IBookmarkHistory[];

  constructor(
    private serviceBible: ServiceBible,
    private serviceStorage: ServiceStorage) {

    this.items = this.serviceStorage.historyArr;
    this.bookmarks = this.serviceStorage.bookmarkArr;

    this.loadingBookNames();
  }

  loadingBookNames() {
    for (const item of this.items) {
      const theBook = this.serviceBible.theBible.bookIndex[item.book];
      if (theBook)
        item.bookName = theBook.name;
      const bItem = this.bookmarks.find(
        bookmarkItem => bookmarkItem.book===item.book
        && bookmarkItem.chapter === item.chapter);
      item.isBookmarked = !!bItem;
    }
  }

  onclick_restoreHistory(item: IBookmarkHistory) {
    this.itemClick.emit(item);
  }

}
