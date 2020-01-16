import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {HomePage} from './homepage';
import {NavbarModule} from '../../components/navbar/navbar.module';
import {MenuBookChapterComponentModule} from '../../components/menu-book-chapter/menu-book-chapter.module';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    NavbarModule,
    MenuBookChapterComponentModule,
    IonicPageModule.forChild(HomePage),
  ],
  entryComponents: [
    HomePage
  ]
})
export class HomePageModule {}
