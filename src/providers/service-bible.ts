import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {SQLite, SQLiteDatabaseConfig, SQLiteObject} from '@ionic-native/sqlite';
import {ServiceStorage} from './atom/service-storage';
import {CONFIGS, STORE, TABLE} from '../configs';
import {Bibles} from '../Bibles';
import {Bible, IBible, IBook, IChapter, IVerse} from '../types/bible';
import {Utils} from '../utils';

@Injectable()
export class ServiceBible {

  theBible: IBible;

  private pBibleSql: SQLiteObject;
  private sBibleSql: SQLiteObject;

  constructor(private sqlite: SQLite,
              public serviceStorage: ServiceStorage) {
    this.theBible = new Bible();
  }

  setupReadingBibles() {
    const bibleDownloaded = this.serviceStorage.bibleDownloaded;
    if (bibleDownloaded.length == 1) {
      this.serviceStorage.setStorage(STORE.biblePrimary, bibleDownloaded[0]);
      this.serviceStorage.setStorage(STORE.bibleSecondary, '');
    }
    else if (bibleDownloaded.length > 1) {
      let pBible = this.serviceStorage.bibleSetting.pBible;
      const sBible = this.serviceStorage.bibleSetting.sBible;
      if (!pBible || pBible.length == 0 || bibleDownloaded.indexOf(pBible) < 0) {
        pBible = bibleDownloaded[0] == sBible ? bibleDownloaded[1] : bibleDownloaded[0];
        this.serviceStorage.setStorage(STORE.biblePrimary, pBible);
      }
      if (!sBible || sBible.length == 0 || bibleDownloaded.indexOf(sBible) < 0)
        this.serviceStorage.setStorage(STORE.bibleSecondary, bibleDownloaded[0] == pBible ? bibleDownloaded[1] : bibleDownloaded[0]);
    }
    else {
      this.serviceStorage.setStorage(STORE.biblePrimary, '');
      this.serviceStorage.setStorage(STORE.bibleSecondary, '');
    }
    // re-open the database and re-load books & chapters
    this.openDatabase().then(isDbOpened => {
      if (isDbOpened) {
        this.loadBooks().then(isLoaded => {
          if (isLoaded)
            this.loadChapters().then(isLoaded => {
              if (isLoaded)
                this.loadCurrentSelectedChapter();
            });
        });
      }
      else {
        this.theBible.reset();
      }
    })
  }

  /**
   * Open primary & secondary bibles
   * @returns {Promise<boolean>}
   */
  openDatabase(): Promise<boolean> {
    // loading available bibles
    const aBibles = this.serviceStorage.bibleDownloaded;
    const pBible = this.serviceStorage.bibleSetting.pBible;
    const sBible = this.serviceStorage.bibleSetting.sBible;
    let pdbConfig: SQLiteDatabaseConfig,
      sdbConfig: SQLiteDatabaseConfig;
    let count = 0;
    if (pBible && pBible.length > 0 && aBibles.indexOf(pBible) > -1) {
      pdbConfig = {
        name: Bibles.findBible(pBible).dbFileName,
        location: CONFIGS.db_location_default
      };
      count++;
    }
    if (sBible && sBible.length > 0 && aBibles.indexOf(sBible) > -1) {
      sdbConfig = {
        name: Bibles.findBible(sBible).dbFileName,
        location: CONFIGS.db_location_default
      };
      count++;
    }
    return new Promise(resolve => {
      if (count > 0) {
        if (pdbConfig) {
          this.sqlite.create(pdbConfig).then(sqliteObj => {
            this.pBibleSql = sqliteObj;
            count--;
            if (count == 0) resolve(true);
          }).catch(err => {
            console.error('openDatabase primary Bible ERROR = ', err);
            resolve(false);
          });
        }
        if (sdbConfig) {
          this.sqlite.create(sdbConfig).then(sqliteObj => {
            this.sBibleSql = sqliteObj;
            count--;
            if (count == 0) resolve(true);
          }).catch(err => {
            console.error('openDatabase primary Bible ERROR = ', err);
            resolve(false);
          });
        }
      }
      else {
        resolve(false);
      }
    });
  }

  /**
   * Loading books of the primary bibles
   * @returns {Promise<boolean>}
   */
  loadBooks(): Promise<boolean> {
    const query = 'SELECT book_number, long_name FROM books';
    const parameters = [];
    return new Promise(resolve => {
      this.pBibleSql.executeSql(query, parameters).then(result => {
        this.theBible.reset();
        for (let i = 0; i < result.rows.length; i++) {
          const aBook: IBook = {
            number: result.rows.item(i).book_number,
            name: result.rows.item(i).long_name,
            chapters: []
          };
          const theBook = this.theBible[this.theBible.isBookOld(aBook.number) ? Bible.OLD_TESTAMENT : Bible.NEW_TESTAMENT];
          theBook.push(aBook);
          // reference the book just added into the bookIndex
          this.theBible.bookIndex[aBook.number] = aBook;
        }
        // loading the secondary book name
        if (this.sBibleSql) {
          this.sBibleSql.executeSql(query, parameters).then(result => {
            for (let i = 0; i < result.rows.length; i++) {
              const number = result.rows.item(i).book_number;
              const name = result.rows.item(i).long_name;
              this.theBible.bookIndex[number].nameSecond = name;
            }
          });
        }
        // checking the bookmarks of book
        this.checkingBookmarkedBooks();
        // checking the highlighted of book
        this.checkingHighlightedBooks();

        resolve(true);
      }, (err) => {
        console.error('Unable to execute sql loadBooks = ' + JSON.stringify(err));
        resolve(false);
      });
    });
  }

  /**
   * Load chapters number of books in the bible
   * @returns {Promise<boolean>}
   */
  loadChapters(): Promise<boolean> { // loading all chapters into loaded books
    const query = 'SELECT DISTINCT book_number, chapter FROM verses';
    const parameters = [];
    return new Promise(resolve => {
      this.pBibleSql.executeSql(query, parameters).then(result => {
        for (let i = 0; i < result.rows.length; i++) {
          const book_number = result.rows.item(i).book_number;
          const aChapter: IChapter = {
            number: result.rows.item(i).chapter,
            verses: [],
            isBookmarked: false
          };
          this.theBible.bookIndex[book_number].chapters.push(aChapter);
        }
        resolve(true);
      }, function (error) {
        console.error('bibleService loadChapters error = ' + JSON.stringify(error));
        resolve(false);
      });
    });
  }

  loadCurrentSelectedChapter() {
    const bNumber = this.theBible.selectedBook;
    const chapter = this.theBible.selectedChapter;
    if (bNumber && chapter && chapter.number) {
      this.loadVersesOfChapter(bNumber, chapter.number).then(verses => {
        chapter.verses = verses;
        this.loadStoryOfChapter(verses, bNumber, chapter.number);
        this.loadSecondStoryOfChapter(verses, bNumber, chapter.number);
      });
      // set the history
      this.serviceStorage.setBookmarkHistory(TABLE.HISTORY, bNumber, chapter.number);
    }
  }

  loadVersesOfChapter(book: number, chapter: number, isRemoveStrikedText = true): Promise<IVerse[]> {
    const query = 'SELECT verse, text FROM verses WHERE book_number = ? AND chapter = ?';
    const parameters = [book, chapter];
    return new Promise(resolve => {
      const verses: IVerse[] = [];
      this.pBibleSql.executeSql(query, parameters).then(result => {
        // loading verses' content
        for (let i = 0; i < result.rows.length; i++) {
          const verse: IVerse = {
            verse: result.rows.item(i).verse,
            text: result.rows.item(i).text
          };
          if (isRemoveStrikedText) {
            verse.text = verse.text.replace(/<s>[\s\S]*?<\/s>/ig, '');
          }
          verses.push(verse);
        }
        // loading the secondary text of verses
        const verseIndex = {};
        verses.map(item => verseIndex[item.verse] = item);
        if (this.sBibleSql) {
          this.sBibleSql.executeSql(query, parameters).then(result => {
            for (let i = 0; i < result.rows.length; i++) {
              const verse = result.rows.item(i).verse;
              const text = result.rows.item(i).text;
              verseIndex[verse].textSecond = isRemoveStrikedText ? text.replace(/<s>[\s\S]*?<\/s>/ig, '') : text;
            }
          });
        }
        resolve(verses);
      }, function (error) {
        console.error('bibleService - loadVersesOfChapter error = ' + JSON.stringify(error));
        resolve(verses);
      });
    });
  }

  loadStoryOfChapter(verses: IVerse[], book: number, chapter: number): Promise<boolean> {
    const verseIndex = {};
    verses.map(item => verseIndex[item.verse] = item);
    const query = 'SELECT verse, title FROM stories WHERE book_number = ? AND chapter = ?';
    const parameters = [book, chapter];
    return new Promise(resolve => {
      this.pBibleSql.executeSql(query, parameters).then(result => {
        // loading verses' stories
        for (let i = 0; i < result.rows.length; i++) {
          const verse = result.rows.item(i).verse;
          const title = result.rows.item(i).title;
          verseIndex[verse].story = title;
        }
        resolve(true);
      }, function (error) {
        console.error('bibleService - loadVersesOfChapter error = ' + JSON.stringify(error));
        resolve(false);
      });
    });
  }

  loadSecondStoryOfChapter(verses: IVerse[], book: number, chapter: number): Promise<boolean> {
    const query = 'SELECT verse, title FROM stories WHERE book_number = ? AND chapter = ?';
    const parameters = [book, chapter];
    return new Promise(resolve => {
      if (this.sBibleSql) {
        const verseIndex = {};
        verses.map(item => verseIndex[item.verse] = item);
        this.sBibleSql.executeSql(query, parameters).then(result => {
          for (let i = 0; i < result.rows.length; i++) {
            const verse = result.rows.item(i).verse;
            const title = result.rows.item(i).title;
            verseIndex[verse].storySecond = title;
          }
          resolve(true);
        }, function (error) {
          console.error('bibleService - loadVersesOfChapter error = ' + JSON.stringify(error));
          resolve(false);
        });
      }
      else
        resolve(false);
    });
  }

  /**
   * Search all the primary bible
   * @param searchText
   * @param index
   * @param limit
   * @returns {any}
   */
  searchVerseText(searchResults: { [book: number]: IBook },
                  searchText: string, index = 0, limit = 100,
                  isRemoveStrikedText = true): Promise<number> {
    const searchTextArray = searchText.split(' ');
    const queryText = '%' + searchText.trim().replace(/\s/ig, '%') + '%';
    const queryCount = 'SELECT COUNT(*) as count FROM verses WHERE text LIKE ?';
    const query = 'SELECT book_number, chapter, verse, text ' +
      'FROM verses WHERE text LIKE ? LIMIT ?, ?';
    const parameters = [queryText, index, limit];
    const parametersCount = [queryText];
    return new Promise(resolve => {
      if (this.pBibleSql) {
        this.pBibleSql.executeSql(query, parameters).then(result => {
          let count = -1;
          this.pBibleSql.executeSql(queryCount, parametersCount).then(countResult => {
            if (count == 0)
              resolve(countResult.rows.item(0).count);
            else count = countResult.rows.item(0).count;
          });
          try {
            for (let i = 0; i < result.rows.length; i++) {
              const book_number = result.rows.item(i).book_number;
              const chapter_number = result.rows.item(i).chapter;
              const verse = result.rows.item(i).verse;
              let text = result.rows.item(i).text;
              if (isRemoveStrikedText)
                text = text.replace(/<s>[\s\S]*?<\/s>/ig, '');
              // strip html tag from the original text
              text = Utils.htmlDecode(text);
              text = Utils.highlight(text, searchTextArray);

              const book_name = this.theBible.bookIndex[book_number].name;
              if (!searchResults[book_number])
                searchResults[book_number] = {
                  number: book_number,
                  name: book_name,
                  chapters: [],
                };
              const chapter = searchResults[book_number].chapters.find(item => item.number === chapter_number);
              if (!chapter)
                searchResults[book_number].chapters.push({
                  number: chapter_number,
                  verses: [{verse, text}]
                });
              else
                chapter.verses.push({verse, text});
            }
          }
          catch (err) {
            console.error('ERROR search all = ' + JSON.stringify(err));
          }
          if (count > -1) resolve(count);
          else count = 0;
        }, function (error) {
          console.error('bibleService - loadVersesOfChapter error = ' + JSON.stringify(error));
          resolve(0);
        });
      }
      else
        resolve(0);
    });
  }

  //==== for bookmarks ====
  // load bookmarked books that have bookmarked chapters
  checkingBookmarkedBooks() {
    const bookmarks = this.serviceStorage.bookmarkArr;
    const bookmarkedBooks: number[] = [];
    for (const bookmark of bookmarks) {
      if (bookmarkedBooks.indexOf(bookmark.book) < 0)
        bookmarkedBooks.push(bookmark.book);
    }
    this.theBible.old.map(item => item.hasBookmark = bookmarkedBooks.indexOf(item.number) > -1);
    this.theBible.new.map(item => item.hasBookmark = bookmarkedBooks.indexOf(item.number) > -1);
  }

  // load bookmarked chapters of a book
  getBookmarkedChapters(book: number): number[] {
    const bookmarks = this.serviceStorage.bookmarkArr;
    return bookmarks.filter(item => item.book === book).map(item => item.chapter);
  }

  //==== for highlight ====
  // load books that have highlighted verses
  checkingHighlightedBooks() {
    const hlights = this.serviceStorage.highlightArr;
    const hlightedBooks: number[] = [];
    for (const hlight of hlights) {
      if (hlightedBooks.indexOf(hlight.book) < 0)
        hlightedBooks.push(hlight.book);
    }
    this.theBible.old.map(item => item.hasHighlight = hlightedBooks.indexOf(item.number) > -1);
    this.theBible.new.map(item => item.hasHighlight = hlightedBooks.indexOf(item.number) > -1);
  }

  // check chapters that have highlighted verses of a book
  getHighlightedChapters(book: number): number[] {
    const hlights = this.serviceStorage.highlightArr;
    return hlights.filter(item => item.book === book).map(item => item.chapter);
  }

}

