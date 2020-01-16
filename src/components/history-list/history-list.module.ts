import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {HistoryListComponent} from './history-list';

@NgModule({
  imports: [IonicPageModule.forChild(HistoryListComponent)],
  declarations: [HistoryListComponent],
  exports: [HistoryListComponent],
})

export class HistoryListComponentModule {
}
