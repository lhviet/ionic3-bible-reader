import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {PopoverBiblePage} from './popover-bible';
import {BibleManagementComponentModule} from '../../components/bible-management/bible-management.component.module';

@NgModule({
  declarations: [
    PopoverBiblePage,
  ],
  imports: [
    BibleManagementComponentModule,
    IonicPageModule.forChild(PopoverBiblePage),
  ],
  entryComponents: [
    PopoverBiblePage
  ]
})
export class PopoverLocaleModule {}
