import {Component, OnInit} from '@angular/core';
import {IonicPage, ViewController} from 'ionic-angular';
import {CONFIGS} from '../../configs';
import {ServiceHelper} from '../../providers/service-helper';

@IonicPage({
  name: 'modalBegin'
})
@Component({
  templateUrl: 'modal-app-begin.html'
})
export class ModalAppBeginPage implements OnInit {

  public appName: string;
  public version: string;
  public rate_app_text: string;
  public feature_new: string;
  public feature_basic: string;

  constructor(private viewCtrl: ViewController,
              private serviceHelper: ServiceHelper) {

    this.appName = CONFIGS.appName;
    this.version = CONFIGS.app_version;
    this.rate_app_text = CONFIGS.rate_app_text;
    this.feature_new = CONFIGS.feature_new;
    this.feature_basic = CONFIGS.feature_basic;
  }

  ngOnInit(): void {
    this.serviceHelper.trackPage('App_Begin_page');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  rating() {
    this.serviceHelper.showAppRate();
  }

}
