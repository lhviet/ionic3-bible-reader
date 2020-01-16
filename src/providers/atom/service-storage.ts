import {Injectable} from '@angular/core';
import {Platform, Events, AlertController} from 'ionic-angular';
import {Transfer, TransferObject} from '@ionic-native/transfer';
import {File, RemoveResult} from '@ionic-native/file';
import {NativeStorage} from '@ionic-native/native-storage';
import {SQLite, SQLiteDatabaseConfig, SQLiteObject} from '@ionic-native/sqlite';
import {Zip} from '@ionic-native/zip';
import {BIBLE} from '../../Bibles';
import {IBookmarkHistory} from '../../types/bible';
import {PLATFORM, TABLE, STORE, DEFAULT, CONFIGS} from '../../configs';

export const EVENT_DATABASE_READY = 'database:ready';
export const EVENT_STORAGE_READY = 'storage_configs:ready';
export const EVENT_BOOKMARK_HISTORY_UPDATED = 'BookmarkHistory:ready';
export const EVENT_STORAGE_UPDATED = 'storage_configs:changed';

export interface IStorage {
  pBible: string;
  sBible: string;
  isDual: boolean;
  isDbReady: boolean;
}

const DB_DATA: SQLiteDatabaseConfig = {
  name: 'data.db',
  location: 'default'
};

@Injectable()
export class ServiceStorage {

  private localDB: SQLiteObject;

  bibleSetting: IStorage = {
    pBible: '',
    sBible: '',
    isDual: DEFAULT.isDual,
    isDbReady: false,
  };
  historyArr: IBookmarkHistory[];
  bookmarkArr: IBookmarkHistory[];
  highlightArr: IBookmarkHistory[];

  heighOfItem: {
    menuBook: number,
    menuChapter: number,
  };

  isSettingReady = false;
  version: string;
  fontsize: number;
  bibleDownloaded: string[];
  downloadingBibles: string[];
  deletingBibles: string[];

  constructor(private platform: Platform,
              private events: Events,
              private alertCtrl: AlertController,
              private zip: Zip,
              private nativeStorage: NativeStorage,
              private sqlite: SQLite,
              private transfer: Transfer,
              private file: File) {
    this.historyArr = [];
    this.bookmarkArr = [];
    this.highlightArr = [];
    this.heighOfItem = {menuBook: 0, menuChapter: 0};

    this.version = '';
    this.fontsize = DEFAULT.fontsize;
    this.bibleDownloaded = [];
    this.downloadingBibles = [];
    this.deletingBibles = [];
  }

  loadingConfiguration() {
    this.sqlite.create(DB_DATA).then((db: SQLiteObject) => {
      this.localDB = db;
      const query1 = 'CREATE TABLE IF NOT EXISTS highlight (book INTEGER NOT NULL, chapter INTEGER NOT NULL, verse INTEGER NOT NULL, createdAt DATE DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(book,chapter,verse));';
      const query2 = 'CREATE TABLE IF NOT EXISTS bookmark (book INTEGER NOT NULL, chapter INTEGER NOT NULL, createdAt DATE DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(book,chapter));';
      const query3 = 'CREATE TABLE IF NOT EXISTS history (book INTEGER NOT NULL, chapter INTEGER NOT NULL, createdAt DATE DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(book,chapter));';
      this.localDB.sqlBatch([query1, query2, query3])
        .then(() => {
          this.loadBookmarkHistory(TABLE.BOOKMARK);
          this.loadBookmarkHistory(TABLE.HISTORY);
          this.loadHighlightBookChapter();
        })
        .catch(e => console.error('initDB FAILED ! SQL batch ERROR: ', e));
    }).catch(e => console.error('ServiceStorage openDatabase ERROR = ', e));

    this.loadStoredConfigs();
  }

  isDbDeployed(dbFilename: string): Promise<boolean> {
    const fs = this.file.applicationStorageDirectory;
    const db_location_ios = fs + 'Library/LocalDatabase/';
    const db_location_android = fs + 'databases/';
    const destPath = this.platform.is(PLATFORM.ios) ? db_location_ios : db_location_android;
    return new Promise(resolve => this.file.checkFile(destPath, dbFilename)
      .then(isExisting => resolve(isExisting))
      .catch(err => {
        console.error('checkFile error = ' + JSON.stringify(err));
        resolve(false);
      }));
  }
  /**
   * download the database zip file from remote server
   * return the location of downloaded zip file
   * @returns {Promise<string>}
   */
  downloadDb(zipFilename: string, zipFileAltUrl?: string): Promise<string> {
    const fileTransfer: TransferObject = this.transfer.create();
    const url = encodeURI(BIBLE.uri + zipFilename);
    const destLocation = this.file.dataDirectory + zipFilename;
    // console.log('download from 1 = ' + url);
    return new Promise<string>(resolve => {
      fileTransfer.download(url, destLocation).then(entry => {
        resolve(entry.toURL());
      }, error => {
        // try to download again with the alternative link
        // console.warn('download from 2 = ' + zipFileAltUrl);
        fileTransfer.download(zipFileAltUrl, destLocation).then(entry => {
          resolve(entry.toURL());
        }, error => {
          console.error('ERROR downloadDb 2 = ' + JSON.stringify(error));
          resolve(null);
        });
        console.error('ERROR downloadDb 1 = ' + JSON.stringify(error));
      });
    });
  }
  deleteDb(dbFilename: string): Promise<boolean> {
    const configs: SQLiteDatabaseConfig = { name: dbFilename, location: CONFIGS.db_location_default };
    return new Promise<boolean>(resolve => {
      this.sqlite.deleteDatabase(configs).then(() => {
        resolve(true);
      }).catch(err => {
        console.error('ERROR deleteDb = ' + JSON.stringify(err));
        resolve(false);
      })
    });
  }

  /**
   * Unzip the db.zip file into the app databases
   * @param zipFilePath
   * @param dbFilename
   * @returns {Promise<boolean>}
   */
  unzipDB(zipFilePath: string, zipFileName: string): Promise<boolean> {
    const fs = this.file.applicationStorageDirectory;
    const db_location_ios = fs + 'Library/LocalDatabase/';
    const db_location_android = fs + 'databases/';
    const destPath = this.platform.is(PLATFORM.ios) ? db_location_ios : db_location_android;

    return new Promise<boolean>(resolve => {
      this.zip.unzip(zipFilePath, destPath, (progress) => console.log('Unzipping = ' + Math.round((progress.loaded / progress.total) * 100) + '%'))
        .then((result) => {
          if (result === 0) {
            this.deleteZip(zipFileName);
            resolve(true);
          }
          if (result === -1) {
            console.error('FAILED = ' + zipFilePath);
            this.deleteZip(zipFileName);
            resolve(false);
          }
        });
    });
  }
  private deleteZip(zipFileName: string) {
    this.file.removeFile(this.file.dataDirectory, zipFileName).then((result: RemoveResult) => {
      if (!result.success)
        console.error('ERROR deleteZip = ' + result.fileRemoved.name)
    });
  }

  private publishReady(goal: number, index: number) {
    if (index === goal) {
      this.isSettingReady = true;
      this.events.publish(EVENT_STORAGE_READY);
      this.updateFontsize();
    }
  }

  loadStoredConfigs() {
    const goal = 5;
    let index = 0;
    this.nativeStorage.getItem(STORE.version).then(
      data => {
        this.version = data;
        this.publishReady(goal, index++);
      },
      error => {
        this.publishReady(goal, index++);
      });
    this.nativeStorage.getItem(STORE.fontsize).then(
      data => {
        this.fontsize = JSON.parse(data);
        this.publishReady(goal, index++);
      },
      error => {
        this.fontsize = DEFAULT.fontsize;
        this.publishReady(goal, index++);
      });
    this.nativeStorage.getItem(STORE.isDual).then(
      data => {
        this.bibleSetting.isDual = JSON.parse(data);
        this.publishReady(goal, index++);
      },
      error => {
        this.bibleSetting.isDual = DEFAULT.isDual;
        this.publishReady(goal, index++);
      });
    this.nativeStorage.getItem(STORE.bibleDownloaded).then(
      data => {
        this.bibleDownloaded = data;
        this.publishReady(goal, index++);
      },
      error => {
        this.bibleDownloaded = [];
        this.publishReady(goal, index++);
      });
    this.nativeStorage.getItem(STORE.biblePrimary).then(
      data => {
        this.bibleSetting.pBible = data;
        this.publishReady(goal, index++);
      },
      error => {
        this.bibleSetting.pBible = '';
        this.publishReady(goal, index++);
      });
    this.nativeStorage.getItem(STORE.bibleSecondary).then(
      data => {
        this.bibleSetting.sBible = data;
        this.publishReady(goal, index++);
      },
      error => {
        this.bibleSetting.sBible = '';
        this.publishReady(goal, index++);
      });
  }

  setStorage(key: string, value: any) {
    this.nativeStorage.setItem(key, value);
    switch (key) {
      case STORE.version:
        this.version = value;
        break;
      case STORE.fontsize:
        this.fontsize = value;
        this.updateFontsize();
        break;
      case STORE.bibleDownloaded:
        this.bibleDownloaded = value;
        break;
      case STORE.biblePrimary:
        this.bibleSetting.pBible = value;
        break;
      case STORE.bibleSecondary:
        this.bibleSetting.sBible = value;
        break;
      case STORE.isDual:
        this.bibleSetting.isDual = value;
        break;
      default:
        break;
    }
    // console.warn('set ' + key + ' = ' + JSON.stringify(value));
    this.events.publish(EVENT_STORAGE_UPDATED, key);
  }

  /**
   * This function is used 1 time to notify to the app that
   * the Database is ready after starting
   */
  setDbReady(): void {
    this.bibleSetting.isDbReady = true;
    this.events.publish(EVENT_DATABASE_READY);
  }

  deleteBookmarkHistory(tableName: string, book: number, chapter: number): void {
    const query = 'DELETE FROM ' + tableName + ' WHERE book = ? AND chapter = ?';
    const parameters = [book, chapter];
    this.localDB.executeSql(query, parameters).then(() => {
      this.loadBookmarkHistory(tableName);
    }, (error) => {
      console.error('deleteBookmarkHistory from ' + tableName + ' error = ' + JSON.stringify(error));
    });
  }

  deleteAllBookmarkHistory(tableName: string): void {
    const query = 'DELETE FROM ' + tableName;
    this.localDB.executeSql(query, []).then(() => {
      this.loadBookmarkHistory(tableName);
    }, (error) => {
      console.error('deleteAllBookmarkHistory from ' + tableName + ' error = ' + JSON.stringify(error));
    });
  }

  private deleteLimitHistory(limit: number): void {
    const querySelect = 'SELECT book, chapter FROM history ORDER BY createdAt DESC LIMIT ?, 10;';
    this.localDB.executeSql(querySelect, [limit - 1]).then(result => {
      const params = [];
      let condition = '';
      for (let i = 0; i < result.rows.length; i++){
        params.push(result.rows.item(i).book);
        params.push(result.rows.item(i).chapter);
        condition += 'OR (book = ? AND chapter = ?) '
      }
      condition = condition.substr(3);
      if (params.length > 0) {
        const queryDelete = 'DELETE FROM history WHERE ' + condition;
        this.localDB.executeSql(queryDelete, params).then(() => {
          this.loadBookmarkHistory(TABLE.HISTORY);
        }, (error) => {
          console.error('delete history error = ' + JSON.stringify(error));
        });
      }
    }, (error) => {
      console.error('delete history error = ' + JSON.stringify(error));
    });
  }

  setBookmarkHistory(table: string, book: number, chapter: number, limit = CONFIGS.history_limit): void {
    if (table == TABLE.HISTORY && limit)
      this.deleteLimitHistory(limit);

    const query = 'INSERT OR REPLACE INTO '+ table +' (book, chapter) VALUES(?,?) ; ';
    const parameters = [book, chapter];
    this.localDB.executeSql(query, parameters).then(value => {
      this.loadBookmarkHistory(table);
    }, (error) => {
      console.error('setBookmarkHistory error = ' + JSON.stringify(error));
    });
  }

  loadBookmarkHistory(table: string, limit = 0): Promise<boolean> {
    // clear the array without remove the references
    if (table === TABLE.HISTORY)
      this.historyArr.splice(0, this.historyArr.length);
    if (table === TABLE.BOOKMARK)
      this.bookmarkArr.splice(0, this.bookmarkArr.length);

    let query = 'SELECT book, chapter, createdAt FROM ' + table + ' ORDER BY createdAt DESC';
    if (limit > 0) query = query + ' LIMIT 0, ' + limit;
    return new Promise(resolve => {
      this.localDB.executeSql(query, []).then(result => {
        // console.log('loadBookmarkHistory result = ' + JSON.stringify(result));
        for (let i = 0; i < result.rows.length; i++) {
          const book = result.rows.item(i).book;
          const chapter = result.rows.item(i).chapter;
          const timestamp = result.rows.item(i).createdAt;

          if (table === TABLE.HISTORY)
            this.historyArr.push({book, chapter, timestamp});
          if (table === TABLE.BOOKMARK)
            this.bookmarkArr.push({book, chapter, timestamp});
        }
        this.events.publish(EVENT_BOOKMARK_HISTORY_UPDATED, table);
        resolve(true);
      }, (error) => {
        console.error('loadBookmarkHistory error = ' + JSON.stringify(error));
        resolve(false);
      });
    });
  }

  presentConfirm(title: string, message: string, handleConfirmJob: any): void {
    const alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Continue...',
          handler: () => handleConfirmJob()
        }
      ]
    });
    alert.present();
  }

  // ==== HIGHLIGHT ====
  setHighlight(book: number, chapter: number, verse: number): Promise<boolean> {
    const query = 'INSERT OR REPLACE INTO '+ TABLE.HIGHLIGHT +' (book, chapter, verse) VALUES(?,?,?)';
    const parameters = [book, chapter, verse];
    return new Promise(resolve => {
      this.localDB.executeSql(query, parameters).then(value => {
        this.loadHighlightBookChapter();
        resolve(true);
      }, (error) => {
        console.error('ERROR setHighlight = ' + JSON.stringify(error));
        resolve(false);
      });
    });
  }
  removeHighlight(book: number, chapter: number, verse: number): Promise<boolean> {
    const query = 'DELETE FROM ' + TABLE.HIGHLIGHT + ' WHERE book = ? AND chapter = ? AND verse = ?';
    const parameters = [book, chapter, verse];
    return new Promise(resolve => {
      this.localDB.executeSql(query, parameters).then(value => {
        this.loadHighlightBookChapter();
        resolve(true);
      }, (error) => {
        console.error('ERROR setHighlight = ' + JSON.stringify(error));
        resolve(false);
      });
    });
  }

  loadHighlightBookChapter(): Promise<boolean> {
    // clear the array without remove the references
    this.highlightArr.splice(0, this.highlightArr.length);
    const query = 'SELECT DISTINCT book, chapter FROM ' + TABLE.HIGHLIGHT;
    return new Promise(resolve => {
      this.localDB.executeSql(query, []).then(result => {
        for (let i = 0; i < result.rows.length; i++) {
          const book = result.rows.item(i).book;
          const chapter = result.rows.item(i).chapter;
          this.highlightArr.push({book, chapter});
        }
        this.events.publish(EVENT_BOOKMARK_HISTORY_UPDATED, TABLE.HIGHLIGHT);
        resolve(true);
      }, (error) => {
        console.error('loadHighlightBookChapter error = ' + JSON.stringify(error));
        resolve(false);
      });
    });
  }

  loadHighlightsOfChapter(book: number, chapter: number): Promise<number[]> {
    const hlights: number[] = [];
    const query = 'SELECT verse FROM ' + TABLE.HIGHLIGHT + ' WHERE book = ? AND chapter = ?';
    const parameters = [book, chapter];
    return new Promise(resolve => {
      this.localDB.executeSql(query, parameters).then(result => {
        for (let i = 0; i < result.rows.length; i++) {
          const verse = result.rows.item(i).verse;
          hlights.push(verse);
        }
        resolve(hlights);
      }, (error) => {
        console.error('loadHighlightsOfChapter error = ' + JSON.stringify(error));
        resolve(hlights);
      });
    });
  }

  updateFontsize() {
    const html = document.getElementsByTagName('html');
    if (html.length > 0)
      html.item(0).style.fontSize = this.fontsize + '%';
  }

  isLatestVersion = (): boolean => this.version.indexOf(CONFIGS.app_version) > -1;

}

