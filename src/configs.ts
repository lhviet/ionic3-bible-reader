export const CONFIGS = {
  appName: 'Bible Reader',
  description: 'Dependency Injection',
  app_version: '2017.06.05',
  rate_app_text: 'Leave us a comment to help others to know how this Bible is helpful to them.',
  copyright: 'Bibooki Mobile Studio @2017',
  homepage: 'http://bibooki.com',
  contact: 'mobile@bibooki.com',
  about_note: 'Your donation by <b>PAYPAL</b> to: <b>LHViet88 (@gmail.com)</b> will help us to maintain and to continue develop this application.<br>Thank you for your help.',
  feature_new: '<ul>' +
  '<li>Bookmark & highlight verses</li>' +
  '<li>300 records of your history</li>' +
  '<li>3 search modes: books, in chapter, the whole bible.</li>' +
  '</ul>',
  feature_basic: '<ul>' +
  '<li>Changes size of text</li>' +
  '</ul>',
  db_location_default: 'default',
  history_limit: 300,
  app_rate_android: 'market://details?id=com.bibooki.mobile.bible.reader.android.google',
  app_rate_ios: '1047054345',
  admobIds: {
    android: {
      banner: 'ca-app-pub-6148713949526588/4298577714',
      interstitial: 'ca-app-pub-6148713949526588/5775310914'
    },
    ios: {
      banner: 'ca-app-pub-6148713949526588/8728777311',
      interstitial: 'ca-app-pub-6148713949526588/1205510510'
    }
  },
  is_display_ads: true,
  google_analytics: 'UA-29094709-14',
};

export const TABLE = {
  HISTORY: 'history',
  BOOKMARK: 'bookmark',
  HIGHLIGHT: 'highlight',
};

export const PLATFORM = {
  ios: 'ios',
  android: 'android'
};

export const STORE = {
  version: 'version',
  fontsize: 'font_size',
  bibleDownloaded: 'bibles_downloaded',
  biblePrimary: 'bible_primary',
  bibleSecondary: 'bible_secondary',
  isDual: 'is_dual_mode'
};

export const DEFAULT = {
  fontsize: 62.5,
  isDual: false
};

