import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HowTo } from './how-to';
import {NavbarModule} from '../../components/navbar/navbar.module';

@NgModule({
  declarations: [
    HowTo,
  ],
  imports: [
    NavbarModule,
    IonicPageModule.forChild(HowTo),
  ],
  entryComponents: [
    HowTo
  ]
})
export class HowToModule {}
