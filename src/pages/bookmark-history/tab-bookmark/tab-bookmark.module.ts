import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TabBookmarkPage} from './tab-bookmark';

@NgModule({
  declarations: [
    TabBookmarkPage,
  ],
  imports: [
    IonicPageModule.forChild(TabBookmarkPage),
  ],
  entryComponents: [
    TabBookmarkPage
  ]
})
export class TabBookmarkModule {}
