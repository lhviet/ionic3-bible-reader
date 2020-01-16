import {Component, OnInit} from '@angular/core';
import {App, IonicPage, NavController, ViewController} from 'ionic-angular';
import {ServiceHelper} from '../../providers/service-helper';
import {IBook} from '../../types/bible';
import {ServiceBible} from '../../providers/service-bible';

@IonicPage({
  name: 'modal-search-all'
})
@Component({
  templateUrl: 'modal-search-all.html'
})
export class ModalSearchAllPage implements OnInit {

  sConfigs: {
    index: number,
    limit: number,
    count: number,
    total: number
  };
  bookArr: IBook[];
  searchResult: {[book: number]: IBook};

  constructor(private viewCtrl: ViewController,
              private appCtrl: App,
              private navCtrl: NavController,
              private serviceBible: ServiceBible,
              private serviceHelper: ServiceHelper) {
    this.reset();
  }

  ngOnInit(): void {
    this.serviceHelper.trackPage('Modal_Search_All');
    this.serviceHelper.showAdmobInterstitial();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  private reset() {
    this.sConfigs = {
      index: 0,
      limit: 100,
      count: 0,
      total: 0
    };
    this.bookArr = [];
    this.searchResult = {};
  }

  onSearchClear(ev) {
    this.reset();
  }

  onSearchInput(ev) {
    const val = ev.target.value;
    const searchText = val && val.trim() != '' ? val : '';
    this.reset();
    if (searchText && searchText.length > 1) {
      this.serviceBible.searchVerseText(this.searchResult, searchText).then(total => {
        this.sConfigs.total = total;
        this.bookArr = Object.keys(this.searchResult).map(key => this.searchResult[key]);
        this.bookArr.map(b => b.chapters.map(c => (this.sConfigs.count += c.verses.length)));
      });
    }
  }

  onSearchMore(searchText: string) {
    this.sConfigs.index += 100;
    this.sConfigs.count = 0;
    this.serviceBible.searchVerseText(this.searchResult, searchText, this.sConfigs.index).then(total => {
      this.bookArr = Object.keys(this.searchResult).map(key => this.searchResult[key]);
      this.bookArr.map(b => b.chapters.map(c => (this.sConfigs.count += c.verses.length)));
    });
  }

  onclick_goChapterDetail(book: IBook, chapter: number) {
    this.serviceBible.theBible.selectedBook = book.number;
    this.serviceBible.theBible.resetSelectedChapter(chapter);
    this.navCtrl.push('chapter-detail');
  }
}
