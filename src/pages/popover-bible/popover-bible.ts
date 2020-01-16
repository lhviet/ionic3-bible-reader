import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {ServiceStorage} from '../../providers/atom/service-storage';
import {STORE} from '../../configs';
import {ServiceHelper} from '../../providers/service-helper';

@IonicPage({
  name: 'popover-bible'
})
@Component({
  templateUrl: './popover-bible.html',
})
export class PopoverBiblePage implements OnInit {

  fontsize = 62.5;
  bibleDownloaded: string[];

  constructor(
    private navCtrl: NavController,
    private serviceHelper: ServiceHelper,
    private serviceStorage: ServiceStorage
  ) {
    this.fontsize = this.serviceStorage.fontsize;
    this.bibleDownloaded = this.serviceStorage.bibleDownloaded;
  }

  ngOnInit(): void {
    this.serviceHelper.showAdmobInterstitial();
  }

  onclick_fontIncrease() {
    this.fontsize = (this.fontsize * 10 + 5) / 10;
    this.serviceStorage.setStorage(STORE.fontsize, this.fontsize);
  }

  onclick_fontDecrease() {
    this.fontsize = (this.fontsize * 10 - 5) / 10;
    this.serviceStorage.setStorage(STORE.fontsize, this.fontsize);
  }

  onclick_gotoDownloadBiblePage() {
    this.navCtrl.push('bibles-page');
  }
}
