import {Injectable} from '@angular/core';
import {Platform} from 'ionic-angular';
import {Toast} from '@ionic-native/toast';
import {Network} from '@ionic-native/network';
import {AdMob, AdMobOptions} from '@ionic-native/admob';
import {AppRate} from '@ionic-native/app-rate';
import {GoogleAnalytics} from '@ionic-native/google-analytics';
import {CONFIGS, PLATFORM} from '../configs';

@Injectable()
export class ServiceHelper {

  isGoogleAnalyticsReady = false;

  constructor(private network: Network,
              private admob: AdMob,
              private appRate: AppRate,
              private toast: Toast,
              private ga: GoogleAnalytics,
              private platform: Platform) {
  }

  checkIsConnected(isNotify = false): boolean {
    try {
      if (this.network.type == 'none') {
        if (isNotify)
          this.toast.showShortBottom('You need Internet connection to continue...').subscribe();
        return false;
      }
      return true;
    }
    catch (e) {
      console.error('checkIsConnected ERROR = ' + JSON.stringify(e));
      return false;
    }
  }

  private getAdmobId() {
    const admobid = {
      banner: '',
      interstitial: ''
    };
    if (this.platform.is(PLATFORM.android)) { // for android & amazon-fireos
      admobid.banner = CONFIGS.admobIds.android.banner;
      admobid.interstitial = CONFIGS.admobIds.android.interstitial;
    }
    else { // for ios
      admobid.banner = CONFIGS.admobIds.ios.banner;
      admobid.interstitial = CONFIGS.admobIds.ios.interstitial;
    }
    return admobid;
  }

  initInternetServices() {
    if (CONFIGS.is_display_ads && this.checkIsConnected()) {
      const adConfig: AdMobOptions = {
        adId: this.getAdmobId().banner,
        autoShow: false
      };
      this.admob.createBanner(adConfig);
      this.admob.onAdFailLoad().subscribe((e) => {
        console.error('Admob FAILED to createBanner = ' + JSON.stringify(e))
      });
      this.admob.onAdLoaded().subscribe(() => {
        this.admob.showBanner(this.admob.AD_POSITION.BOTTOM_CENTER);
      });
      const adConfigInterstitial: AdMobOptions = {
        adId: this.getAdmobId().interstitial,
        autoShow: false
      };
      this.admob.prepareInterstitial(adConfigInterstitial);
    }
  }

  showAdmobInterstitial(): void {
    this.admob.showInterstitial();
  }

  showAppRate() {
    this.appRate.preferences.storeAppURL = {
      ios: CONFIGS.app_rate_ios,
      android: CONFIGS.app_rate_android
    };
    this.appRate.promptForRating(true);
  }

  initTracking() {
    this.ga.startTrackerWithId(CONFIGS.google_analytics)
      .then(() => {
        // console.log('Google analytics is ready now');
        this.isGoogleAnalyticsReady = true;
        this.ga.trackView('Home_page');
      })
      .catch(e => console.error('Error starting GoogleAnalytics = ' + JSON.stringify(e)));
  }

  trackPage(page: string) {
    // must make sure that the Google Analytics is already init
    if (this.isGoogleAnalyticsReady) {
      // console.log('trackPage = ' + page);
      this.ga.trackView(page);
    }
  }

}

