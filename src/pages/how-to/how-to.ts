import {Component, OnInit} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {ServiceHelper} from '../../providers/service-helper';

@IonicPage({
  name: 'howto'
})
@Component({
  selector: 'page-how-to',
  templateUrl: 'how-to.html',
})
export class HowTo implements OnInit {

  tips: string;
  link: string;

  constructor(
    private serviceHelper: ServiceHelper
  ) {

    this.tips =
      'Firstly you need to download at least 1 Bible in Download Bibles page<br/>' +
      '<ul>' +
      '<li>Download 2 Bible books will help you read the two at the same time</li>' +
      '<li>You may download many books, and set the Primary to the book you read more often</li>' +
      '<li>A small switch button on the top bar will be shown if you set both Primary & Secondary bibles</li>' +
      '</ul>'
    ;
  }

  ngOnInit(): void {
    this.serviceHelper.showAdmobInterstitial();
  }

}
