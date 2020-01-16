import {Component, ViewChild} from '@angular/core';
import {Platform, Nav, Events, LoadingController, ModalController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {ServiceHelper} from '../providers/service-helper';
import {ServiceBible} from '../providers/service-bible';
import {EVENT_STORAGE_READY, ServiceStorage} from '../providers/atom/service-storage';
import {CONFIGS, STORE} from './../configs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'home';

  pages: Array<{ title: string, icon: string, name: string, color?: string }>;

  public appName: string;

  constructor(private platform: Platform,
              private statusBar: StatusBar,
              private splashScreen: SplashScreen,
              private loadingCtrl: LoadingController,
              private modalCtrl: ModalController,
              private events: Events,
              private serviceStorage: ServiceStorage,
              private serviceHelper: ServiceHelper,
              private serviceBible: ServiceBible
  ) {

    this.initializeApp();

    this.appName = CONFIGS.appName;

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'Download Bibles', icon: 'md-cloud-download', name: 'bibles-page', color: 'blacklight'},
      {title: 'Home', icon: 'ios-home', name: 'home'},
      {title: 'History & Bookmark', icon: 'ios-timer-outline', name: 'bookmark-history', color: 'blacklight'},
      {title: 'How To', icon: 'md-bulb', name: 'howto', color: 'blacklight'},
      {title: 'About', icon: 'ios-information-circle-outline', name: 'about', color: 'blacklight'}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.serviceStorage.loadingConfiguration();
      this.listenToEvents();

      this.serviceHelper.initTracking();
    });
  }

  private openDBs() {
    // try to deploy the Dictionaries and open them
    const loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
    loading.present();
    this.serviceBible.openDatabase().then(isDbReady => {
      if (isDbReady)
        this.serviceStorage.setDbReady();
      loading.dismiss();
    });
  }

  listenToEvents() {
    this.events.subscribe(EVENT_STORAGE_READY, () => {

      this.openDBs();

      if (!this.serviceStorage.isLatestVersion()) {
        const profileModal = this.modalCtrl.create('modalBegin');
        profileModal.present();
        this.serviceStorage.setStorage(STORE.version, CONFIGS.app_version);
      }
    });
    setTimeout(() => {
      this.serviceHelper.initInternetServices();
    }, 3000);
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.title === 'History & Bookmark')
      this.nav.push(page.name);
    else
      this.nav.setRoot(page.name);
  }
}
