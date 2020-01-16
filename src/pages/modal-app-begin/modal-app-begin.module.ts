import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {ModalAppBeginPage} from './modal-app-begin';

@NgModule({
  declarations: [
    ModalAppBeginPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalAppBeginPage),
  ],
  entryComponents: [
    ModalAppBeginPage
  ]
})
export class ModalAppBeginModule {}
