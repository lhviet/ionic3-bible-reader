import {Component, OnDestroy, OnInit} from '@angular/core';
import {Events, IonicPage} from 'ionic-angular';
import {Utils} from '../../utils';
import {IBibleItems, BIBLE, Bibles, IBibleItem} from '../../Bibles';
import {Languages} from '../../Languages';
import {EVENT_STORAGE_UPDATED, IStorage, ServiceStorage} from '../../providers/atom/service-storage';
import {ServiceHelper} from '../../providers/service-helper';
import {STORE} from '../../configs';
import {ServiceBible} from '../../providers/service-bible';

@IonicPage({
  name: 'bibles-page'
})
@Component({
  selector: 'bibles-page',
  templateUrl: './bibles.html',
})
export class BiblesPage implements OnInit, OnDestroy {

  bibleLangArr: string[];
  bibleGroup = [];
  bibles: IBibleItems = BIBLE.list;
  languages = Languages;
  downloadingBibles: string[];
  bibleDownloaded: string[];
  bSetting: IStorage;

  constructor(
    private serviceStorage: ServiceStorage,
    private serviceHelper: ServiceHelper,
    private serviceBible: ServiceBible,
    private events: Events,
  ) {
    this.bibleLangArr = Object.keys(this.bibles);
    this.downloadingBibles = this.serviceStorage.downloadingBibles;
    this.bSetting = this.serviceStorage.bibleSetting;

    this.updateBibleDownloaded();

  }
  ngOnInit(): void {
    this.events.subscribe(EVENT_STORAGE_UPDATED, args => {
      if (args === STORE.bibleDownloaded)
        this.updateBibleDownloaded();
    });
    this.serviceHelper.showAdmobInterstitial();
  }
  ngOnDestroy(): void {
    // need to unsubscribe because the subscribe event still existing after quit
    // ==> lead to be called many times
    this.events.unsubscribe(EVENT_STORAGE_UPDATED);
  }

  private updateBibleDownloaded() {
    this.bibleDownloaded = this.serviceStorage.bibleDownloaded;
    this.serviceBible.setupReadingBibles();
  }

  toggleBibleGroup = (element: string) => Utils.toggleGroup(this.bibleGroup, element);

  isGroupOpened = (element) => this.bibleGroup.indexOf(element) > -1;

  downloadBible(bibleCode: string) {
    if (this.bibleDownloaded.indexOf(bibleCode) < 0) {
      this.downloadingBibles.push(bibleCode);
      this.deployDB(bibleCode).then(isDeployed => {
        this.downloadingBibles.splice(this.downloadingBibles.indexOf(bibleCode), 1);
        if (isDeployed && this.bibleDownloaded.indexOf(bibleCode) < 0)
          this.serviceStorage.setStorage(STORE.bibleDownloaded, this.bibleDownloaded.concat(bibleCode));
      });
    }
  }

  /**
   * Check if the databases are not deployed
   * If not, download the zip file from remote and deploy it
   * @returns {Promise<boolean>}
   */
  private deployDB(bibleCode: string): Promise<boolean> {
    const bible = Bibles.findBible(bibleCode);
    return new Promise(resolve => {
      this.serviceStorage.isDbDeployed(bible.dbFileName).then(isDeployed => {
        if (!isDeployed && this.serviceHelper.checkIsConnected()) {
          this.serviceStorage.downloadDb(bible.zipFilename, bible.url).then(zipFilePath => {
            if (zipFilePath)
              this.serviceStorage.unzipDB(zipFilePath, bible.zipFilename)
                .then(isUnzipped => resolve(isUnzipped));
            else
              resolve(false);
          });
        }
        else if (isDeployed)
          resolve(true);
        else
          resolve(false);
      });
    });
  }

  deleteBible(bible: IBibleItem): Promise<boolean> {
    this.serviceStorage.deletingBibles.push(bible.code);
    return new Promise(resolve => {
      this.serviceStorage.isDbDeployed(bible.dbFileName).then(isDeployed => {
        if (isDeployed) {
          this.serviceStorage.deleteDb(bible.dbFileName).then(isDeleted => {
            this.serviceStorage.deletingBibles.splice(this.serviceStorage.deletingBibles.indexOf(bible.code), 1);
            if (isDeleted) {
              // update downloaded bibles
              this.bibleDownloaded.splice(this.bibleDownloaded.indexOf(bible.code), 1);
              this.serviceStorage.setStorage(STORE.bibleDownloaded, this.bibleDownloaded);
              resolve(true);
            }
            else {
              resolve(false);
            }
          });
        }
        else {
          this.bibleDownloaded.splice(this.bibleDownloaded.indexOf(bible.code), 1);
          this.serviceStorage.setStorage(STORE.bibleDownloaded, this.bibleDownloaded);
          resolve(true);
        }
      });
    });
  }
}
