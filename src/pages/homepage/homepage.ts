import {Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import {
  IStorage,
  ServiceStorage
} from '../../providers/atom/service-storage';
import {ServiceHelper} from '../../providers/service-helper';
import {
  NavController, Content, ModalController,
  IonicPage, PopoverController
} from 'ionic-angular';
import {MenuBookChapterComponent} from '../../components/menu-book-chapter/menu-book-chapter';
import {STORE} from '../../configs';

@IonicPage({
  name: 'home'
})
@Component({
  templateUrl: 'homepage.html'
})
export class HomePage implements OnInit {

  bSetting: IStorage;

  searchText = '';

  @ViewChild(Content) content: Content;
  @ViewChild('skinContent') skinContent: ElementRef;
  @ViewChild('menuBookChapter') menuBookChapter: MenuBookChapterComponent;

  constructor(private modalCtrl: ModalController,
              private navCtrl: NavController,
              private popoverCtrl: PopoverController,
              private serviceStorage: ServiceStorage,
              private serviceHelper: ServiceHelper) {

    this.bSetting = this.serviceStorage.bibleSetting;
  }

  ngOnInit(): void {
    this.serviceHelper.trackPage('Home_page');

    this.navCtrl.viewDidEnter.subscribe(() => {
      this.menuBookChapter.updateView();
    });
  }

  onSearch(searchText: string) {
    this.searchText = searchText;
  }

  onclick_gotoDownloadBiblePage() {
    this.navCtrl.push('bibles-page');
  }

  onclick_popoverBible(myEvent) {
    const popover = this.popoverCtrl.create('popover-bible');
    popover.present({ev: myEvent});
  }

  onclick_openModalSearchAll() {
    const searchModal = this.modalCtrl.create('modal-search-all');
    searchModal.present();
  }

  onclick_swapBible() {
    this.serviceStorage.setStorage(STORE.isDual, !this.bSetting.isDual);
  }
}
