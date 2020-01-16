import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ModalSearchAllPage} from './modal-search-all';

@NgModule({
  declarations: [
    ModalSearchAllPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalSearchAllPage),
  ],
  entryComponents: [
    ModalSearchAllPage
  ]
})
export class ModalSearchAllModule {}
