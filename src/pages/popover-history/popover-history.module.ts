import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {PopoverHistoryPage} from './popover-history';
import {HistoryListComponentModule} from '../../components/history-list/history-list.module';

@NgModule({
  declarations: [
    PopoverHistoryPage,
  ],
  imports: [
    HistoryListComponentModule,
    IonicPageModule.forChild(PopoverHistoryPage),
  ],
  entryComponents: [
    PopoverHistoryPage
  ]
})
export class PopoverHistoryModule {}
