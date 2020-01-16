export interface IBibleItem {
  code: string;
  zipFilename: string;
  dbFileName: string;
  label: string;
  description: string;
  url: string;
  language?: string;
}

export interface IBibleItems {
  [languageCode: string]: IBibleItem[];
}

export const BIBLE: {
  uri: string;
  list: IBibleItems;
} = {
  uri: 'http://public.bibooki.com/databases/bibles/',
  list: {
    // English
    en: [
      {
        code: 'NIV_2011',
        zipFilename: 'NIV2011.zip',
        dbFileName: 'NIV2011.SQLite3',
        label: 'New International Version',
        description: 'Red letter edition',
        url: 'https://www.dropbox.com/s/anb8q424sp4fs0p/NIV2011.zip?dl=1'
      },
      {
        code: 'NIVUK_2011',
        zipFilename: 'NIVUK2011_biblica.zip',
        dbFileName: 'NIVUK2011_biblica.SQLite3',
        label: 'New International Version UK',
        description: 'Biblica',
        url: 'https://www.dropbox.com/s/es0f7m8n8ewjub9/NIVUK2011_biblica.zip?dl=1'
      },
      {
        code: 'NIVUS_1984',
        zipFilename: 'NIVUS.zip',
        dbFileName: 'NIVUS.SQLite3',
        label: 'New International Version US',
        description: 'Biblica',
        url: 'https://www.dropbox.com/s/gn1omnfkip7kqib/NIVUS.zip?dl=1'
      },
      {
        code: 'ESV_2011',
        zipFilename: 'ESV.zip',
        dbFileName: 'ESV.SQLite3',
        label: 'English Standard Version',
        description: 'Red letter edition',
        url: 'https://www.dropbox.com/s/a8mmm8q4qi23ajh/ESV.zip?dl=1'
      },
      {
        code: 'KJV_1769',
        zipFilename: 'KJV_.zip',
        dbFileName: 'KJV_.SQLite3',
        label: 'King James Version',
        description: 'Red letter edition',
        url: 'https://www.dropbox.com/s/dwnrrmqd1ythvu9/KJV_.zip?dl=1'
      },
      {
        code: 'NKJV_1982',
        zipFilename: 'NKJV.zip',
        dbFileName: 'NKJV.SQLite3',
        label: 'New King James Version',
        description: 'Red letter edition',
        url: 'https://www.dropbox.com/s/2g62umlspodg6iq/NKJV.zip?dl=1'
      },
      {
        code: 'AKJV_1999',
        zipFilename: 'AKJV_.zip',
        dbFileName: 'AKJV_.SQLite3',
        label: 'American King James Version',
        description: 'Red letter edition',
        url: 'https://www.dropbox.com/s/7ollucnxkvrb9ma/AKJV_.zip?dl=1'
      },
      {
        code: 'UKJV_2000',
        zipFilename: 'UKJV.zip',
        dbFileName: 'UKJV.SQLite3',
        label: 'Updated King James Version',
        description: '',
        url: 'https://www.dropbox.com/s/ifi4g89zl56meb4/UKJV.zip?dl=1'
      },
      {
        code: 'MKJV_2008',
        zipFilename: 'MKJV.zip',
        dbFileName: 'MKJV.SQLite3',
        label: 'Modern King James Version',
        description: 'Jay P. Green',
        url: 'https://www.dropbox.com/s/6kw46f6tx3c8g74/MKJV.zip?dl=1'
      },
      {
        code: 'NEV_2011',
        zipFilename: 'NEV.zip',
        dbFileName: 'NEV.SQLite3',
        label: 'New European Version of the Bible',
        description: 'Carelinks Ministries',
        url: 'https://www.dropbox.com/s/1mmjia3xaywpvfg/NEV.zip?dl=1'
      },
      {
        code: 'ICB_2015',
        zipFilename: 'ICB.zip',
        dbFileName: 'ICB.SQLite3',
        label: 'International Children’s Bible',
        description: 'Thomas Nelson',
        url: 'https://www.dropbox.com/s/j0o5kqmquy97bbz/ICB.zip?dl=1'
      },
      {
        code: 'ISV_2011',
        zipFilename: 'ISV.zip',
        dbFileName: 'ISV.SQLite3',
        label: 'International Standard Version',
        description: 'ISV Foundation',
        url: 'https://www.dropbox.com/s/ezjn0zv9osliejo/ISV.zip?dl=1'
      }
    ],
    // Vietnamese
    vi: [
      {
        code: 'BD2011',
        zipFilename: 'BD2011.zip',
        dbFileName: 'BD2011.SQLite3',
        label: 'Bản Dịch 2011',
        description: '©2011 by Mục sư Đặng Ngọc Báu',
        url: 'https://www.dropbox.com/s/3szcsmmk72gi8ch/BD2011.zip?dl=1'
      },
      {
        code: 'BPT',
        zipFilename: 'BPT.zip',
        dbFileName: 'BPT.SQLite3',
        label: 'Bản Phổ Thông',
        description: '©2010 World Bible Translation Center',
        url: 'https://www.dropbox.com/s/0ssy4xp69clczs2/BPT.zip?dl=1'
      },
      {
        code: 'RVV11_2010',
        zipFilename: 'RVV11_2010.zip',
        dbFileName: 'RVV11_2010.SQLite3',
        label: 'Revised Vietnamese Version Bible',
        description: 'United Bible Societies',
        url: 'https://www.dropbox.com/s/1pczw2hci7a1uu4/RVV11_2010.zip?dl=1'
      },
      {
        code: 'VIET_1934',
        zipFilename: 'VIET.zip',
        dbFileName: 'VIET.SQLite3',
        label: 'Kinh Thánh Tin Lành',
        description: 'Public domain',
        url: 'https://www.dropbox.com/s/62l13sqdjxkkit8/VIET.zip?dl=1'
      },
      {
        code: 'LCCMN_2012',
        zipFilename: 'LCCMN.zip',
        dbFileName: 'LCCMN.SQLite3',
        label: 'Lời Chúa Cho Mọi Người',
        description: '',
        url: 'https://www.dropbox.com/s/brprwc0nowuxm46/LCCMN.zip?dl=1'
      },
      {
        code: 'NVB_2002',
        zipFilename: 'NVB.zip',
        dbFileName: 'NVB.SQLite3',
        label: 'Kinh Thánh Bản Dịch Mới',
        description: '',
        url: 'https://www.dropbox.com/s/gzgovzcw19678vv/NVB2002.zip?dl=1'
      }
    ],
    // Korean
    kr: [
      {
        code: 'RNKSV_2001',
        zipFilename: 'RNKSV.zip',
        dbFileName: 'RNKSV.SQLite3',
        label: 'Revised New Korean Standard Version',
        description: 'Korean Bible Society',
        url: 'https://www.dropbox.com/s/pxo5o23lhj3rch3/RNKSV.zip?dl=1'
      },
      {
        code: 'KMB',
        zipFilename: 'KMB.zip',
        dbFileName: 'KMB.SQLite3',
        label: 'Korean Modern Bible',
        description: '',
        url: 'https://www.dropbox.com/s/wcrtnd7d63fin1f/KMB.zip?dl=1'
      },
      {
        code: 'KMB2',
        zipFilename: 'KMB2.zip',
        dbFileName: 'KMB2.SQLite3',
        label: 'Korean Modern Bible 2',
        description: '',
        url: 'https://www.dropbox.com/s/gxtlkvgvskyxbb3/KMB2.zip?dl=1'
      },
      {
        code: 'Hangul',
        zipFilename: 'Hangul.zip',
        dbFileName: 'Hangul.SQLite3',
        label: 'American Standard Hangul',
        description: '',
        url: 'https://www.dropbox.com/s/c9cb2i9nlrq1eni/Hangul.zip?dl=1'
      },
      {
        code: 'KEB',
        zipFilename: 'KEB.zip',
        dbFileName: 'KEB.SQLite3',
        label: 'Korean Easy Bible',
        description: '',
        url: 'https://www.dropbox.com/s/d7lve4u9v81szah/KEB.zip?dl=1'
      },
      {
        code: 'KrASB',
        zipFilename: 'KrASB.zip',
        dbFileName: 'KrASB.SQLite3',
        label: 'Korean American Standard Revised',
        description: '',
        url: 'https://www.dropbox.com/s/rfukjr0jdwswqxe/KrASB.zip?dl=1'
      },
      {
        code: 'KrASB4',
        zipFilename: 'KrASB4.zip',
        dbFileName: 'KrASB4.SQLite3',
        label: 'Korean American Standard Revised 4th Edition',
        description: '',
        url: 'https://www.dropbox.com/s/qv65bz9ddyq5ap6/KrASB4.zip?dl=1'
      },
      {
        code: 'Woor',
        zipFilename: 'Woor.zip',
        dbFileName: 'Woor.SQLite3',
        label: '우리말사랑누리집',
        description: '',
        url: 'https://www.dropbox.com/s/yqabmdnkn1ykw21/Woor.zip?dl=1'
      },
      {
        code: 'NKSB_2001',
        zipFilename: 'NKSB.zip',
        dbFileName: 'NKSB.SQLite3',
        label: '표준새번역',
        description: 'Korean Bible Society',
        url: 'https://www.dropbox.com/s/3ykxp5nrqyu40k7/NKSB.zip?dl=1'
      },
      {
        code: 'KCB_2005',
        zipFilename: 'KCB.zip',
        dbFileName: 'KCB.SQLite3',
        label: '성경',
        description: 'The Catholic Bishops\' Conference of Korea',
        url: 'https://www.dropbox.com/s/2aky1wgtla4ge98/KCB.zip?dl=1'
      },
      {
        code: 'KPB',
        zipFilename: 'KPB.zip',
        dbFileName: 'KPB.SQLite3',
        label: '평양말 성경',
        description: '',
        url: 'https://www.dropbox.com/s/4vkak3q113y6gl0/KPB.zip?dl=1'
      },
      {
        code: 'KRB',
        zipFilename: 'KRB.zip',
        dbFileName: 'KRB.SQLite3',
        label: 'Korean Rentier Bible',
        description: '',
        url: 'https://www.dropbox.com/s/vax8cv89nfmdv4c/KRB.zip?dl=1'
      },
      {
        code: 'KHB',
        zipFilename: 'KHB.zip',
        dbFileName: 'KHB.SQLite3',
        label: 'Korean Hyeondaeeo Bible',
        description: '',
        url: 'https://www.dropbox.com/s/lep4a9kymnnab8y/KHB.zip?dl=1'
      },
      {
        code: 'CoTr',
        zipFilename: 'CoTr.zip',
        dbFileName: 'CoTr.SQLite3',
        label: 'Korean CoTrans Bible',
        description: '',
        url: 'https://www.dropbox.com/s/8irdt4vpfqwe7wn/CoTr.zip?dl=1'
      },
      {
        code: 'KKJV_1994',
        zipFilename: 'KKJV.zip',
        dbFileName: 'KKJV.SQLite3',
        label: '한글판 킹제임스',
        description: 'Word Of God Preservation Society',
        url: 'https://www.dropbox.com/s/wlr2cyq3157ts1b/KKJV.zip?dl=1'
      },
      {
        code: 'TKV_1991',
        zipFilename: 'TKV.zip',
        dbFileName: 'TKV.SQLite3',
        label: '현대어성경',
        description: '성서원',
        url: 'https://www.dropbox.com/s/c6t86pcdnrkhw16/TKV.zip?dl=1'
      }
    ],
    // Chinese
    zh: [
      {
        code: 'CNET_2011',
        zipFilename: 'CNET.zip',
        dbFileName: 'CNET.SQLite3',
        label: '新英语译本',
        description: 'Biblical Studies Press, L.L.C.',
        url: 'https://www.dropbox.com/s/ormzp0a6kb7euow/CNET.zip?dl=1'
      },
      {
        code: 'CNETS_2011',
        zipFilename: 'CNETS.zip',
        dbFileName: 'CNETS.SQLite3',
        label: '新英语译本',
        description: 'Biblical Studies Press, L.L.C.',
        url: 'https://www.dropbox.com/s/ih3vn9ocz8nwuvp/CNETS.zip?dl=1'
      },
      {
        code: 'RCUV_2010',
        zipFilename: 'RCUV.zip',
        dbFileName: 'RCUV.SQLite3',
        label: '和合本修訂版',
        description: 'Red letter edition',
        url: 'https://www.dropbox.com/s/d9capghgtoztofp/RCUV.zip?dl=1'
      },
      {
        code: 'RCUVS_2010',
        zipFilename: 'RCUVS.zip',
        dbFileName: 'RCUVS.SQLite3',
        label: '和合本修订版',
        description: 'Red letter edition',
        url: 'https://www.dropbox.com/s/ifdp8134phauh06/RCUVS.zip?dl=1'
      },
      {
        code: 'LCT_2007',
        zipFilename: 'LCT_.zip',
        dbFileName: 'LCT_.SQLite3',
        label: '聖經原文編號逐字中譯',
        description: '',
        url: 'https://www.dropbox.com/s/k3k0m056jb5ylie/LCT_.zip?dl=1'
      },
      {
        code: 'LCTS_2007',
        zipFilename: 'LCTS_.zip',
        dbFileName: 'LCTS_.SQLite3',
        label: '圣经原文编号逐字中译',
        description: '',
        url: 'https://www.dropbox.com/s/ykgjouz4xu3vjsl/LCTS_.zip?dl=1'
      },
      {
        code: 'CNV_1992',
        zipFilename: 'CNV.zip',
        dbFileName: 'CNV.SQLite3',
        label: '新譯本 (中國傳統)',
        description: '',
        url: 'https://www.dropbox.com/s/qildr42vkqrurtb/CNV.zip?dl=1'
      },
      {
        code: 'CNVS_1992',
        zipFilename: 'CNVS.zip',
        dbFileName: 'CNVS.SQLite3',
        label: '新译本 (简体中国)',
        description: '',
        url: 'https://www.dropbox.com/s/qei5wukh5wd6x9z/CNVS.zip?dl=1'
      },
      {
        code: 'CSB_2011',
        zipFilename: 'CSB.zip',
        dbFileName: 'CSB.SQLite3',
        label: '中文標準譯本',
        description: 'Red letter edition',
        url: 'https://www.dropbox.com/s/b7ttnxaatyh7da9/CSB.zip?dl=1'
      },
      {
        code: 'CKJV',
        zipFilename: 'CKJV.zip',
        dbFileName: 'CKJV.SQLite3',
        label: '中文钦定本 (中國傳統)',
        description: '',
        url: 'https://www.dropbox.com/s/8o0n39c7apuwa4z/CKJV.zip?dl=1'
      },
    ],
    // Hindi
    hi: [
      {
        code: 'ERV_HI_2010',
        zipFilename: 'ERV-HI.zip',
        dbFileName: 'ERV-HI.SQLite3',
        label: 'पवित्र बाइबिल',
        description: 'WBTC - World Bible Translation Center',
        url: 'https://www.dropbox.com/s/chv1wusyra3pfij/ERV-HI.zip?dl=1'
      },
      {
        code: 'HBSI_2002',
        zipFilename: 'HBSI.zip',
        dbFileName: 'HBSI.SQLite3',
        label: 'पवित्र बाइबिल',
        description: 'The Bible Society of India',
        url: 'https://www.dropbox.com/s/42huyg4dw3lzmpe/HBSI.zip?dl=1'
      },
    ],
    // Spanish
    es: [
      {
        code: 'BTX',
        zipFilename: 'BTX.zip',
        dbFileName: 'BTX.SQLite3',
        label: 'La Biblia Textual',
        description: 'Latin American Bible Society',
        url: 'https://www.dropbox.com/s/zknep1yvhu7ufkv/BTX.zip?dl=1'
      }
    ],
    // French
    fr: [
      {
        code: 'LBM_2012',
        zipFilename: 'LBM.zip',
        dbFileName: 'LBM.SQLite3',
        label: 'La Bible de Zadoc Khan',
        description: 'Zadoc Kahn',
        url: 'https://www.dropbox.com/s/pc5gigplgn645sl/LBM.zip?dl=1'
      },
      {
        code: 'SG21_2007',
        zipFilename: 'SG21.zip',
        dbFileName: 'SG21.SQLite3',
        label: 'Segond 21',
        description: 'Société Biblique de Genève',
        url: 'https://www.dropbox.com/s/5t278m8tc9dkwgg/SG21.zip?dl=1'
      },
      {
        code: 'BDS',
        zipFilename: 'BDS.zip',
        dbFileName: 'BDS.SQLite3',
        label: 'La Bible du Semeur',
        description: '',
        url: 'https://www.dropbox.com/s/las7tcxpk0pvpcz/BDS.zip?dl=1'
      },
      {
        code: 'DBY06_2006',
        zipFilename: 'DBY06.zip',
        dbFileName: 'DBY06.SQLite3',
        label: 'Bible Perret-Gentil et Rilliet',
        description: '',
        url: 'https://www.dropbox.com/s/bc3rki0ak5bz5y2/DBY06.zip?dl=1'
      },
      {
        code: 'OSTr_1996',
        zipFilename: 'OSTr.zip',
        dbFileName: 'OSTr.SQLite3',
        label: 'La Bible Ostervald',
        description: '',
        url: 'https://www.dropbox.com/s/bc3rki0ak5bz5y2/DBY06.zip?dl=1'
      },
      {
        code: 'BDP_1998',
        zipFilename: 'BDP.zip',
        dbFileName: 'BDP.SQLite3',
        label: 'Bible des Peuples',
        description: 'Bernard et Louis Hureau',
        url: 'https://www.dropbox.com/s/h3mtrsu438p14ar/BDP.zip?dl=1'
      },
      {
        code: 'PGR_1861',
        zipFilename: 'PGR.zip',
        dbFileName: 'PGR.SQLite3',
        label: 'King James Française',
        description: '',
        url: 'https://www.dropbox.com/s/eycu97om84sp99w/PGR.zip?dl=1'
      },
      {
        code: 'JB_1966',
        zipFilename: 'JB.zip',
        dbFileName: 'JB.SQLite3',
        label: 'La Bible de Jérusalem',
        description: 'Darton, Longman & Todd',
        url: 'https://www.dropbox.com/s/0pn1867se6je5ji/JB.zip?dl=1'
      }
    ],
    // German
    de: [
      {
        code: 'NGU_2011',
        zipFilename: 'NGU_2011.zip',
        dbFileName: 'NGU_2011.SQLite3',
        label: 'Neue Genfer Übersetzung – Neues Testament und Psalmen',
        description: 'Geneva Bible Society',
        url: 'https://www.dropbox.com/s/frhmfqp429a6fcl/NGU_2011.zip?dl=1'
      },
      {
        code: 'MENG_2010',
        zipFilename: 'MENG.zip',
        dbFileName: 'MENG.SQLite3',
        label: 'Menge-Bibel',
        description: 'Geneva Bible Society',
        url: 'https://www.dropbox.com/s/ni1a2ts6jwy6vj4/MENG.zip?dl=1'
      },
      {
        code: 'NeU_2010',
        zipFilename: 'NeU_2010.zip',
        dbFileName: 'NeU_2010.SQLite3',
        label: 'Neue evangelistische Übersetzung',
        description: 'Karl-Heinz Vanheiden',
        url: 'https://www.dropbox.com/s/sphb8y089zwhv5s/NeU_2010.zip?dl=1'
      },
      {
        code: 'EU_2005',
        zipFilename: 'EU_2005.zip',
        dbFileName: 'EU_2005.SQLite3',
        label: 'Einheitsübersetzung',
        description: 'Catholic Bible Society',
        url: 'https://www.dropbox.com/s/rw96yt3xqh8ut1g/EU_2005.zip?dl=1'
      },
      {
        code: 'FB4_2004',
        zipFilename: 'FB4.zip',
        dbFileName: 'FB4.SQLite3',
        label: 'FreeBible',
        description: 'Michael Mustun',
        url: 'https://www.dropbox.com/s/lfohemwkfba8hmd/FB4.zip?dl=1'
      },
      {
        code: 'HFA_2002',
        zipFilename: 'HFA.zip',
        dbFileName: 'HFA.SQLite3',
        label: 'Hoffnung für Alle',
        description: 'IBS - International Bible Society (Biblica)',
        url: 'https://www.dropbox.com/s/tktvf0zcgwwders/HFA.zip?dl=1'
      },
      {
        code: 'S00_2000',
        zipFilename: 'S00.zip',
        dbFileName: 'S00.SQLite3',
        label: 'Schlachter-Bibel',
        description: 'Geneva Bible Society',
        url: 'https://www.dropbox.com/s/zhlc2sbck2s3r3b/S00.zip?dl=1'
      },
      {
        code: 'VOB_2012',
        zipFilename: 'VOB.zip',
        dbFileName: 'VOB.SQLite3',
        label: 'Die Volxbibel Тугуы Testament',
        description: 'народная Библия, перевод делался всем миром по принципу Wiki с использованием сленга (не путать с ругательствами), псалмы рифмованы под рэп.',
        url: 'https://www.dropbox.com/s/d9oq6q45fim55kx/VOB.zip?dl=1'
      }
    ],
    // Italian
    it: [
      {
        code: 'CEI08_2008',
        zipFilename: 'CEI08.zip',
        dbFileName: 'CEI08.SQLite3',
        label: 'Bibbia CEI',
        description: '',
        url: 'https://www.dropbox.com/s/rh3wjceag267ns5/CEI08.zip?dl=1'
      },
      {
        code: 'NR06_2006',
        zipFilename: 'NR06.zip',
        dbFileName: 'NR06.SQLite3',
        label: 'La Nuova Riveduta',
        description: '',
        url: 'https://www.dropbox.com/s/3upy9dkn1m50y3d/NR06.zip?dl=1'
      },
      {
        code: 'LND_1991',
        zipFilename: 'LND.zip',
        dbFileName: 'LND.SQLite3',
        label: 'La Nuova Diodati',
        description: 'La Buona Novella Inc.',
        url: 'https://www.dropbox.com/s/3ql450fr570xb8u/LND.zip?dl=1'
      },
      {
        code: 'RIV_1990',
        zipFilename: 'RIV.zip',
        dbFileName: 'RIV.SQLite3',
        label: 'La Riveduta',
        description: 'Waldesan Giovanni Luzzi',
        url: 'https://www.dropbox.com/s/pyupznysf17kjnr/RIV.zip?dl=1'
      }
    ],
    // Czech
    cs: [
      {
        code: 'CSP_2009',
        zipFilename: 'CSP.zip',
        dbFileName: 'CSP.SQLite3',
        label: 'Český studijní překlad',
        description: 'Nadační fond překladu Bible',
        url: 'https://www.dropbox.com/s/ym053u2x2rcafvk/CSP.zip?dl=1'
      },
      {
        code: 'B21_2009',
        zipFilename: 'B21.zip',
        dbFileName: 'B21.SQLite3',
        label: 'Bible 21 - překlad 21. století',
        description: '',
        url: 'https://www.dropbox.com/s/id2cuqj6j9t6005/B21.zip?dl=1'
      },
      {
        code: 'PMP_CZ',
        zipFilename: 'PMP_CZ.zip',
        dbFileName: 'PMP_CZ.SQLite3',
        label: 'Český studijní překlad Miloše Pavlíka',
        description: '',
        url: 'https://www.dropbox.com/s/pchdgf6lv9hajbf/PMP_CZ.zip?dl=1'
      },
      {
        code: 'KMS_2000',
        zipFilename: 'KMS.zip',
        dbFileName: 'KMS.SQLite3',
        label: 'Nová smlouva',
        description: '',
        url: 'https://www.dropbox.com/s/4vfgs84t1p3mltv/KMS.zip?dl=1'
      },
      {
        code: 'CEP_1979',
        zipFilename: 'CEP.zip',
        dbFileName: 'CEP.SQLite3',
        label: 'Český ekumenický překlad',
        description: 'Czech Bible Society',
        url: 'https://www.dropbox.com/s/6okn9xemjzkg0bm/CEP.zip?dl=1'
      }
    ],
    // Indonesian
    id: [
      {
        code: 'VMD_2006',
        zipFilename: 'VMD.zip',
        dbFileName: 'VMD.SQLite3',
        label: 'Kitab Perjanjian Baru',
        description: '',
        url: 'https://www.dropbox.com/s/7pa5n0lknl2utyq/VMD.zip?dl=1'
      },
      {
        code: 'BNPB_2009',
        zipFilename: 'BNPB.zip',
        dbFileName: 'BNPB.SQLite3',
        label: 'Terjemahan Lama',
        description: '',
        url: 'https://www.dropbox.com/s/9gfc2kfkqsqeeea/BNPB.zip?dl=1'
      },
      {
        code: 'Uma_1996',
        zipFilename: 'Uma.zip',
        dbFileName: 'Uma.SQLite3',
        label: 'Terjemahan Baru',
        description: '',
        url: 'https://www.dropbox.com/s/sns3etx2xl2mvun/Uma.zip?dl=1'
      },
      {
        code: 'BPJ',
        zipFilename: 'BPJ.zip',
        dbFileName: 'BPJ.SQLite3',
        label: 'Versi Mudah Dibaca',
        description: 'WBTC - World Bible Translation Center',
        url: 'https://www.dropbox.com/s/y7r4bw9yu5m6pn9/BPJ.zip?dl=1'
      },
      {
        code: 'BIMK_1985',
        zipFilename: 'BIMK.zip',
        dbFileName: 'BIMK.SQLite3',
        label: 'Alkitab dalam Bahasa Indonesia Masa Kini',
        description: 'Indonesian Bible Society',
        url: 'https://www.dropbox.com/s/m2omelphx054s5y/BIMK.zip?dl=1'
      },
      {
        code: 'BISH_1985',
        zipFilename: 'BISH.zip',
        dbFileName: 'BISH.SQLite3',
        label: 'Uma New Testament',
        description: 'Anonymous, Wycliffe Bible Translators, Indonesian Bible Society',
        url: 'https://www.dropbox.com/s/997fa0ru8qcs8vk/BISH.zip?dl=1'
      },
      {
        code: 'TJB_1974',
        zipFilename: 'TJB.zip',
        dbFileName: 'TJB.SQLite3',
        label: 'Bahasa Indonesia Sehari-hari',
        description: '',
        url: 'https://www.dropbox.com/s/4227kh0l5rnsdbf/TJB.zip?dl=1'
      },
      {
        code: 'TB_1974',
        zipFilename: 'TB.zip',
        dbFileName: 'TB.SQLite3',
        label: 'Terjemahan Baru',
        description: 'Indonesian Bible Society',
        url: 'https://www.dropbox.com/s/8zjdx4s6czr5ogu/TB.zip?dl=1'
      },
      {
        code: 'TJL_1954',
        zipFilename: 'TJL.zip',
        dbFileName: 'TJL.SQLite3',
        label: 'Bahasa Nias-Perjanjian Baru',
        description: '',
        url: 'https://www.dropbox.com/s/s0bqy99g2hoxd0g/TJL.zip?dl=1'
      }
    ],
    // Arabic
    ar: [
      {
        code: 'ERV_AR_2009',
        zipFilename: 'ERV-AR.zip',
        dbFileName: 'ERV-AR.SQLite3',
        label: 'Arabic Bible: Easy-to-Read Version',
        description: 'WBTC - World Bible Translation Center',
        url: 'https://www.dropbox.com/s/3vkfq6p8p4jbd6p/ERV-AR.zip?dl=1'
      },
      {
        code: 'LA',
        zipFilename: 'LA.zip',
        dbFileName: 'LA.SQLite3',
        label: 'live Arabic(targamet El hayah)',
        description: '',
        url: 'https://www.dropbox.com/s/n6non19pbzc5qss/LA.zip?dl=1'
      },
      {
        code: 'NAV_1997',
        zipFilename: 'NAV.zip',
        dbFileName: 'NAV.SQLite3',
        label: 'كتاب الحياة',
        description: '',
        url: 'https://www.dropbox.com/s/o6ymfe43rvrwhtq/NAV.zip?dl=1'
      },
      {
        code: 'SVDA_1865',
        zipFilename: 'SVDA.zip',
        dbFileName: 'SVDA.SQLite3',
        label: 'فانديك',
        description: '',
        url: 'https://www.dropbox.com/s/l77l0pkgd85uq5w/SVDA.zip?dl=1'
      }
    ],
    // Amharic
    am: [
      {
        code: 'ANT_20010',
        zipFilename: 'ANT.zip',
        dbFileName: 'ANT.SQLite3',
        label: 'አዳስ ሴዳን',
        description: '',
        url: 'https://www.dropbox.com/s/eex5ysiszb4mv7o/ANT.zip?dl=1'
      },
      {
        code: 'Ararat_1910',
        zipFilename: 'Ararat.zip',
        dbFileName: 'Ararat.SQLite3',
        label: 'Արարատյան Թարգմանություն մասնիկներով',
        description: 'Հայաստանի Աստվածաշնչային ընկերություն',
        url: 'https://www.dropbox.com/s/xe2g7ul70sy9dvg/Ararat.zip?dl=1'
      }
    ],
    // Thai
    th: [
      {
        code: 'ThKJV_2003',
        zipFilename: 'ThKJV.zip',
        dbFileName: 'ThKJV.SQLite3',
        label: 'ไทยฉบับ KJV',
        description: 'перевод с английской KJV, Philip R. J. Pope',
        url: 'https://www.dropbox.com/s/jmtrdh0u8s7xth3/ThKJV.zip?dl=1'
      }
    ],
    // Burmese
    my: [
      {
        code: 'BJB_1840',
        zipFilename: 'BJB.zip',
        dbFileName: 'BJB.SQLite3',
        label: 'Burmese Bible',
        description: 'Adoniram Judson, Bible Society of Myanmar',
        url: 'https://www.dropbox.com/s/ue6ii9fhjmopkj1/BJB.zip?dl=1'
      },
      {
        code: 'BurB_1825',
        zipFilename: 'BurB.zip',
        dbFileName: 'BurB.SQLite3',
        label: 'Burmese (Myanmar) Bible',
        description: 'Adoniram Judson',
        url: 'https://www.dropbox.com/s/as0ihdtrn9wfvz8/BurB.zip?dl=1'
      }
    ],
    // Khmer
    km: [
      {
        code: 'KhNT',
        zipFilename: 'KhNT.zip',
        dbFileName: 'KhNT.SQLite3',
        label: 'Khmer Christian Bible - New Testament',
        description: 'Words of Life Ministries',
        url: 'https://www.dropbox.com/s/0qpd31fj1xuuhlj/KhNT.zip?dl=1'
      }
    ],
    // Hausa
    ha: [
      {
        code: 'HAU_2010',
        zipFilename: 'HAU.zip',
        dbFileName: 'HAU.SQLite3',
        label: 'Littafi Mai Tsarki',
        description: 'Bible Society of Nigeria',
        url: 'https://www.dropbox.com/s/uwc7gtlocd6t4pp/HAU.zip?dl=1'
      }
    ]
  }
};

export class Bibles {

  constructor() {
  }

  static findBible(code: string): IBibleItem {
    for (const key in BIBLE.list) {
      const theBible = BIBLE.list[key].find(item => item.code == code);
      if (theBible) {
        theBible['language'] = key;
        return theBible;
      }
    }
    return null;
  }
}
