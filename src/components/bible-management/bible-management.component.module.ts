import { NgModule } from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {BibleManagementComponent} from './bible-management.component';

@NgModule({
  imports:        [IonicPageModule.forChild(BibleManagementComponent)],
  declarations:   [BibleManagementComponent],
  exports:        [BibleManagementComponent],
})

export class BibleManagementComponentModule {}
