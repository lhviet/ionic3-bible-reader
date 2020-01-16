import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {TabHistoryPage} from './tab-history';
import {HistoryListComponentModule} from '../../../components/history-list/history-list.module';

@NgModule({
  declarations: [
    TabHistoryPage,
  ],
  imports: [
    HistoryListComponentModule,
    IonicPageModule.forChild(TabHistoryPage),
  ],
  entryComponents: [
    TabHistoryPage
  ]
})
export class TabHistoryModule {}
