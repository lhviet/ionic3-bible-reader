import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ChapterDetailPage} from './chapter-detail';
import {NavbarModule} from '../../components/navbar/navbar.module';
import {MenuBookChapterComponentModule} from '../../components/menu-book-chapter/menu-book-chapter.module';
import {ChapNavComponentModule} from '../../components/chapter-nav/chapnav.component.module';

@NgModule({
  declarations: [
    ChapterDetailPage,
  ],
  imports: [
    NavbarModule,
    ChapNavComponentModule,
    MenuBookChapterComponentModule,
    IonicPageModule.forChild(ChapterDetailPage),
  ],
  entryComponents: [
    ChapterDetailPage
  ]
})
export class ChapterDetailPageModule {
}
