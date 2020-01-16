import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {NavbarModule} from '../../components/navbar/navbar.module';
import {BiblesPage} from './bibles';
import {BibleManagementComponentModule} from '../../components/bible-management/bible-management.component.module';

@NgModule({
  declarations: [
    BiblesPage,
  ],
  imports: [
    NavbarModule,
    BibleManagementComponentModule,
    IonicPageModule.forChild(BiblesPage),
  ],
  entryComponents: [
    BiblesPage
  ]
})
export class BiblesPageModule {}
