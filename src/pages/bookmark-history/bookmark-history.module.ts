import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {BookmarkHistoryPage} from './bookmark-history';
import {NavbarModule} from '../../components/navbar/navbar.module';

@NgModule({
  declarations: [
    BookmarkHistoryPage,
  ],
  imports: [
    NavbarModule,
    IonicPageModule.forChild(BookmarkHistoryPage),
  ],
  entryComponents: [
    BookmarkHistoryPage,
  ]
})
export class BookmarkHistoryModule {
}
