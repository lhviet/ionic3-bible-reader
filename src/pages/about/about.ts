import {Component, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import {ModalController, IonicPage} from 'ionic-angular';
import {ServiceHelper} from '../../providers/service-helper';
import {CONFIGS} from '../../configs';

@IonicPage({
  name: 'about'
})
@Component({
  templateUrl: 'about.html',
})
export class AboutPage implements AfterViewInit {

  appName: string;
  version: string;
  rate_app_text: string;
  copyright: string;
  homepage: string;
  contact: string;
  about_note: string;

  @ViewChild('skinContent', {read: ElementRef}) skinContent: ElementRef;

  constructor(private modalCtrl: ModalController,
              private serviceHelper: ServiceHelper) {

    this.appName = CONFIGS.appName;
    this.version = CONFIGS.app_version;
    this.rate_app_text = CONFIGS.rate_app_text;
    this.copyright = CONFIGS.copyright;
    this.homepage = CONFIGS.homepage;
    this.contact = CONFIGS.contact;
    this.about_note = CONFIGS.about_note;

  }

  ngAfterViewInit(): void {
    this.serviceHelper.trackPage('About_page');
    this.serviceHelper.showAdmobInterstitial();
  }

  openModalNotification() {
    const profileModal = this.modalCtrl.create('modalBegin');
    profileModal.present();
  }

  rating() {
    this.serviceHelper.showAppRate();
  }

}
