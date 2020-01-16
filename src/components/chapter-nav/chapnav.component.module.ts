import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ChapNav} from './chapnav.component';

@NgModule({
  imports: [IonicPageModule.forChild(ChapNav)],
  declarations: [ChapNav],
  exports: [ChapNav],
})

export class ChapNavComponentModule {
}

