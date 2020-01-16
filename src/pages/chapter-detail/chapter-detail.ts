import {Component, ViewChild, OnInit, OnDestroy} from '@angular/core';
import {Content, Events, IonicPage, MenuController, NavController, PopoverController} from 'ionic-angular';
import {Toast} from '@ionic-native/toast';
import {ServiceBible} from '../../providers/service-bible';
import {ServiceHelper} from '../../providers/service-helper';
import {EVENT_BOOKMARK_HISTORY_UPDATED, IStorage, ServiceStorage} from '../../providers/atom/service-storage';
import {STORE, TABLE} from '../../configs';
import {IBible, IBook, IChapter, IVerse} from '../../types/bible';
import {MenuBookChapterComponent} from '../../components/menu-book-chapter/menu-book-chapter';
import {Utils} from '../../utils';
import {Clipboard} from '@ionic-native/clipboard';

@IonicPage({
  name: 'chapter-detail'
})
@Component({
  templateUrl: 'chapter-detail.html',
})
export class ChapterDetailPage implements OnInit, OnDestroy {

  bSetting: IStorage;
  book: IBook;
  chapter: IChapter;
  searchText = '';
  theBible: IBible;

  isCopyMode = false;
  copyVerses: IVerse[];

  @ViewChild(Content) chapterContent: Content;
  @ViewChild('menuBookChapter') menuBookChapter: MenuBookChapterComponent;

  constructor(private events: Events,
              private toast: Toast,
              private clipboard: Clipboard,
              private navCtrl: NavController,
              private menuCtrl: MenuController,
              private popoverCtrl: PopoverController,
              private serviceStorage: ServiceStorage,
              private serviceHelper: ServiceHelper,
              private serviceBible: ServiceBible) {

    this.bSetting = this.serviceStorage.bibleSetting;
    this.theBible = this.serviceBible.theBible;

    this.copyVerses = [];

    this.loadChapter();
  }

  ngOnInit(): void {
    this.serviceHelper.trackPage('Chapter_Detail_page');
    this.events.subscribe(EVENT_BOOKMARK_HISTORY_UPDATED, args => {
      if (args === TABLE.HIGHLIGHT) {
        this.loadHighlights();
      }
    });
  }

  ngOnDestroy(): void {
    this.events.unsubscribe(EVENT_BOOKMARK_HISTORY_UPDATED);
  }

  private loadChapter() {
    this.book = this.theBible.bookIndex[this.theBible.selectedBook];
    this.chapter = this.theBible.selectedChapter;
    if (this.book && this.book.number && this.chapter && this.chapter.number) {
      this.serviceBible.loadCurrentSelectedChapter();
      this.loadIsBookmark();
      this.loadHighlights();
      // scroll back to top if it is not
      try {
        this.chapterContent.scrollTo(0, 0, 200);
      } catch (ex) {
        console.error('Auto Scrolling ERROR = ' + JSON.stringify(ex));
      }
    }
    else
      this.navCtrl.popToRoot();
  }

  private loadIsBookmark() {
    const bookmarks = this.serviceStorage.bookmarkArr;
    const bookmark = bookmarks.find(item => item.book===this.theBible.selectedBook && item.chapter===this.theBible.selectedChapter.number);
    this.theBible.selectedChapter.isBookmarked = !!bookmark;
  }

  private loadHighlights() {
    const bNumber = this.theBible.selectedBook;
    const selectedChap = this.theBible.selectedChapter;
    const hlights = this.serviceStorage.highlightArr;
    const hlight = hlights.find(item => item.book===bNumber && item.chapter===selectedChap.number);
    this.theBible.selectedChapter.hasHighlight = !!hlight;
    // loading highlighted verses of this chapter
    this.serviceStorage.loadHighlightsOfChapter(bNumber, selectedChap.number).then(highlights => {
      highlights.map(hlVerse => {
        const verse = selectedChap.verses.find(item => item.verse == hlVerse);
        if (verse)
          verse.isHighlighted = true;
      });
    });
  }

  onclick_toggleBookmark() {
    if (!this.theBible.selectedChapter.isBookmarked)
      this.serviceStorage.setBookmarkHistory(TABLE.BOOKMARK, this.theBible.selectedBook, this.theBible.selectedChapter.number);
    else
      this.serviceStorage.deleteBookmarkHistory(TABLE.BOOKMARK, this.theBible.selectedBook, this.theBible.selectedChapter.number);
    this.theBible.selectedChapter.isBookmarked = !this.theBible.selectedChapter.isBookmarked;
  }

  onclick_popoverBible(myEvent) {
    const popover = this.popoverCtrl.create('popover-bible');
    popover.present({ ev: myEvent });
  }

  toggleRightMenu() {
    this.menuCtrl.toggle('right');
    this.menuBookChapter.updateView();
  }

  /**
   * The function was called to update the content of the selected chapter (from right menu, i.e.)
   */
  onChangeBookChapter() {
    this.loadChapter();
  }

  onSearch(searchText: string) {
    this.searchText = searchText;
    if (searchText && searchText.length > 0) {
      this.chapter.verses.map(verse => {
        verse.highlightText = Utils.highlight(verse.text, searchText);
        if (verse.textSecond && verse.textSecond.length > 0)
          verse.highlightTextSecond = Utils.highlight(verse.textSecond, searchText);
      });
    }
    else {
      this.chapter.verses.map(verse => {
        delete verse.highlightText;
        delete verse.highlightTextSecond;
      });
    }
  }

  onclick_toggleCopy(): void {
    if (this.isCopyMode) {
      this.isCopyMode = false;
      this.toast.showShortCenter('Copy Mode Disabled').subscribe();
    }
    else {
      this.isCopyMode = true;
      this.toast.showShortCenter('Copy Mode Enabled').subscribe();
    }
    this.copyVerses = [];
  }

  onclick_verse(verse: IVerse): void {
    if (!this.isCopyMode) {
      const bNumber = this.theBible.selectedBook;
      const selectedChap = this.theBible.selectedChapter;
      if (!verse.isHighlighted) {
        this.serviceStorage.setHighlight(bNumber, selectedChap.number, verse.verse).then(isSucceed => {
          verse.isHighlighted = isSucceed;
        })
      }
      else {
        this.serviceStorage.removeHighlight(bNumber, selectedChap.number, verse.verse).then(isRemoved => {
          verse.isHighlighted = !isRemoved;
        })
      }
    }
    else {
      // prepare the verses to copy to clipboards
      const index = this.copyVerses.indexOf(verse);
      if (index < 0)
        this.copyVerses.push(verse);
      else
        this.copyVerses.splice(index, 1);
      // sorting the copied verses
      // sorting from smallest to biggest
      this.copyVerses.sort((a: IVerse, b: IVerse) => a.verse - b.verse);
      this.copyText();
    }
  }

  private copyText(): void {
    let text = '';
    if (this.bSetting.isDual) {
      this.copyVerses.map(verseItem => {
        text += '(' + this.book.name + ' ' + this.chapter.number + ':' + verseItem.verse + ')\n' + Utils.htmlDecode(verseItem.text) + '\n';
        text += '(' + this.book.nameSecond + ' ' + this.chapter.number + ':' + verseItem.verse + ')\n' + Utils.htmlDecode(verseItem.textSecond) + '\n';
      });
    }
    else {
      this.copyVerses.map(verseItem => {
        text += '(' + this.book.name + ' ' + this.chapter.number + ':' + verseItem.verse + ')\n' + Utils.htmlDecode(verseItem.text) + '\n';
      });
    }
    this.clipboard.copy(text).then(() => {
      this.toast.showShortCenter('Copied').subscribe();
    });
  }

  onclick_swapBible() {
    this.serviceStorage.setStorage(STORE.isDual, !this.bSetting.isDual);
  }

}
