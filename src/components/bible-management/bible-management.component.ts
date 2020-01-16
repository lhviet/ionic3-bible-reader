import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Events, NavController} from 'ionic-angular';
import {Bibles, IBibleItem} from '../../Bibles';
import {Languages} from '../../Languages';
import {IStorage, ServiceStorage, EVENT_STORAGE_UPDATED} from '../../providers/atom/service-storage';
import {STORE} from '../../configs';
import {ServiceBible} from '../../providers/service-bible';

@Component({
  selector: 'bible-management-component',
  templateUrl: './bible-management.component.html',
})
export class BibleManagementComponent implements OnInit, OnDestroy {

  @Input() hasDelete = true;

  languages = Languages;
  downloadingBibles: string[];
  bibleDownloaded: string[];
  bibleObjDownloaded: IBibleItem[];
  deletingBibles: string[];
  bSetting: IStorage;

  constructor(
    private navCtrl: NavController,
    private serviceStorage: ServiceStorage,
    private serviceBible: ServiceBible,
    private events: Events,
  ) {
    this.downloadingBibles = this.serviceStorage.downloadingBibles;
    this.deletingBibles = this.serviceStorage.deletingBibles;
    this.bSetting = this.serviceStorage.bibleSetting;
    this.updateBibleDownloaded();

  }

  ngOnInit(): void {
    this.events.subscribe(EVENT_STORAGE_UPDATED, args => {
      if (args === STORE.bibleDownloaded) {
        this.updateBibleDownloaded();
      }
    });
  }

  ngOnDestroy(): void {
    this.events.unsubscribe(EVENT_STORAGE_UPDATED);
  }

  private updateBibleDownloaded() {
    this.bibleDownloaded = this.serviceStorage.bibleDownloaded;
    this.bibleObjDownloaded = this.bibleDownloaded.map(item => Bibles.findBible(item));
    const bSetting = this.serviceStorage.bibleSetting;
    // sorting from smallest to biggest
    this.bibleObjDownloaded.sort((a: IBibleItem, b: IBibleItem) => {
      if (a.code === bSetting.pBible)
        return 1;
      if (b.code === bSetting.pBible)
        return -1;
      if (a.code === bSetting.sBible)
        return 1;
      if (b.code === bSetting.sBible)
        return -1;
      return 0;
    });
    // reverse the order
    this.bibleObjDownloaded.reverse();
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

  setBiblePrimary(bibleCode: string) {
    this.serviceStorage.setStorage(STORE.biblePrimary, bibleCode);
    if (this.bSetting.sBible === bibleCode)
      this.serviceStorage.setStorage(STORE.bibleSecondary, '');
    this.serviceBible.setupReadingBibles();
  }
  setBibleSecondary(bibleCode: string) {
    if (this.bibleDownloaded.length < 2)
      return;
    this.serviceStorage.setStorage(STORE.bibleSecondary, bibleCode);
    if (this.bSetting.pBible === bibleCode)
      this.serviceStorage.setStorage(STORE.biblePrimary, '');
    this.serviceBible.setupReadingBibles();
  }

  onclick_gotoDownloadBiblePage() {
    this.navCtrl.push('bibles-page');
  }
}
