import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app';

import {ServiceHelper} from '../providers/service-helper';
import {ServiceStorage} from '../providers/atom/service-storage';
import {ServiceBible} from '../providers/service-bible';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {GoogleAnalytics} from '@ionic-native/google-analytics';
import {File} from '@ionic-native/file';
import {NativeStorage} from '@ionic-native/native-storage';
import {SQLite} from '@ionic-native/sqlite';
import {Toast} from '@ionic-native/toast';
import {Network} from '@ionic-native/network';
import {AdMob} from '@ionic-native/admob';
import {AppRate} from '@ionic-native/app-rate';
import {Zip} from '@ionic-native/zip';
import {Transfer} from '@ionic-native/transfer';
import {Clipboard} from '@ionic-native/clipboard';

const MY_PAGES = [
  MyApp,
];
@NgModule({
  declarations: MY_PAGES,
  entryComponents: MY_PAGES,
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      preloadModules: true
    }),
  ],
  bootstrap: [IonicApp],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleAnalytics,
    NativeStorage,
    File,
    SQLite,
    Toast,
    Network,
    AdMob,
    AppRate,
    Zip,
    Transfer,
    Clipboard,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServiceHelper,
    ServiceStorage,
    ServiceBible
  ]
})
export class AppModule {
}
