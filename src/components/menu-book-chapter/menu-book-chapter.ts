import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Content, Events, IonicPage, NavController} from 'ionic-angular';
import {
  IStorage,
  ServiceStorage,
  EVENT_BOOKMARK_HISTORY_UPDATED,
  EVENT_DATABASE_READY,
} from '../../providers/atom/service-storage';
import {TABLE} from '../../configs';
import {IBible, IBook, IChapter} from '../../types/bible';
import {ServiceBible} from '../../providers/service-bible';

@IonicPage({
  name: 'menu-book-chapter'
})
@Component({
  selector: 'menuBookChapterComponent',
  templateUrl: 'menu-book-chapter.html',
})
export class MenuBookChapterComponent implements OnInit, OnDestroy {

  @Input() searchText: string;

  @Output() onChangeBookChapter = new EventEmitter<void>();

  @ViewChild('skinContent', {read: ElementRef}) skinContent: ElementRef;
  @ViewChild('bookContent') bookContent: Content;
  @ViewChild('chapterContent') chapterContent: Content;

  bSetting: IStorage;
  theBible: IBible;
  chapters: IChapter[];
  isOldHidden = false;
  isNewHidden = false;

  constructor(private navCtrl: NavController,
              private serviceBible: ServiceBible,
              private serviceStorage: ServiceStorage,
              private events: Events) {

    this.bSetting = this.serviceStorage.bibleSetting;

    this.resetBible();

  }

  ngOnInit(): void {
    this.listenToEvents();
  }
  ngOnDestroy(): void {
    this.events.unsubscribe(EVENT_DATABASE_READY);
    this.events.unsubscribe(EVENT_BOOKMARK_HISTORY_UPDATED);
  }

  private listenToEvents() {
    this.events.subscribe(EVENT_DATABASE_READY, () => {
      // load the Bible books when both Database & Configs are ready
      this.loadBibleBooks();
    });

    this.events.subscribe(EVENT_BOOKMARK_HISTORY_UPDATED, args => {
      if (args === TABLE.BOOKMARK) {
        this.serviceBible.checkingBookmarkedBooks();
        // checking bookmarks of chapters
        this.loadBookmarkedChapters();
      }
      if (args === TABLE.HIGHLIGHT) {
        this.serviceBible.checkingHighlightedBooks();
        // checking bookmarks of chapters
        this.loadHighlightedChapters();
      }
    });
  }

  resetBible() {
    this.theBible = this.serviceBible.theBible;
    this.chapters = this.theBible.selectedBook ? this.theBible.getChapters(this.theBible.selectedBook) : [];
  }

  updateView() {
    const heighOfItem = this.serviceStorage.heighOfItem;
    const selectedB = this.theBible.selectedBook;
    const selectedC = this.theBible.selectedChapter ? this.theBible.selectedChapter.number : 0;
    this.chapters = selectedB ? this.theBible.getChapters(selectedB) : [];

    let offsetBook = 0;
    try {
      const offsetFromTop = document.documentElement.clientHeight / 3;
      if (selectedB) {
        const bookItem = document.getElementById('book_' + selectedB);
        // because of dual mode issue, the heigh of menu book item need to be updated when possible
        if (bookItem.clientHeight > 0)
          heighOfItem.menuBook = bookItem.clientHeight;
        const bookIndex = this.theBible.getOrderIndex(selectedB);
        const heighOfBookItem = this.bSetting.isDual ? heighOfItem.menuBook : heighOfItem.menuChapter;
        offsetBook = heighOfBookItem*bookIndex + 1.5*heighOfItem.menuChapter - offsetFromTop;
      }
      if (selectedC > 0 && (!heighOfItem.menuChapter || heighOfItem.menuChapter <= 0)) {
        const chapterItem = document.getElementById('chapter_' + selectedC);
        heighOfItem.menuChapter = chapterItem.clientHeight;
      }

      const offsetChapter = heighOfItem.menuChapter * selectedC - offsetFromTop;
      this.repositionScroll(offsetBook, offsetChapter);
    }
    catch (ex) {
      console.error('ERROR with Scrolling to selected Book & Chapter !!!')
    }
    // checking bookmarks of chapters
    this.loadBookmarkedChapters();
    // checking highlights of chapters
    this.loadHighlightedChapters();
  }
  repositionScroll(offsetBook: number, offsetChapter: number) {
    try {
      this.bookContent.scrollTo(0, offsetBook, 200);
      this.chapterContent.scrollTo(0, offsetChapter, 200);
    } catch (ex) {
      console.error('Auto Scrolling ERROR = ' + JSON.stringify(ex));
    }
  }

  private loadBookmarkedChapters() {
    const selectedB = this.theBible.selectedBook;
    if (selectedB) {
      const bookmarkedChapters = this.serviceBible.getBookmarkedChapters(selectedB);
      for (const chapter of this.chapters) {
        chapter.isBookmarked = (bookmarkedChapters.indexOf(chapter.number) > -1);
      }
    }
  }

  /**
   * load the Bible books when both Database & Configs are ready
   */
  private loadBibleBooks(): void {
    if (this.bSetting.isDbReady && this.serviceStorage.isSettingReady) {
      this.serviceBible.loadBooks().then(isLoaded => {
        if (isLoaded)
          this.serviceBible.loadChapters();
      });
    }
  }
  private loadHighlightedChapters() {
    const selectedB = this.theBible.selectedBook;
    if (selectedB) {
      const hChapters = this.serviceBible.getHighlightedChapters(selectedB);
      for (const chapter of this.chapters) {
        chapter.hasHighlight = (hChapters.indexOf(chapter.number) > -1);
      }
    }
  }

  selectBook(book: IBook) {
    this.theBible.selectedBook = book.number;
    this.chapters = this.theBible.getChapters(book.number);
    // checking bookmarks of chapters
    this.loadBookmarkedChapters();
    // checking highlights of chapters
    this.loadHighlightedChapters();
  }

  selectChapter(chapter: number) {
    this.theBible.resetSelectedChapter(chapter);
    const currentPage = this.navCtrl.getActive().name;
    if (currentPage === 'ChapterDetailPage')
      this.onChangeBookChapter.emit();
    else
      this.navCtrl.push('chapter-detail');
  }
}
