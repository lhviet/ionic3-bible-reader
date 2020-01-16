import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {MenuBookChapterComponent} from './menu-book-chapter';
import {PipeModule} from '../../providers/pipe/filter.pipe.module';

@NgModule({
  imports:        [
    PipeModule.forChild(),
    IonicPageModule.forChild(MenuBookChapterComponent)
  ],
  declarations:   [MenuBookChapterComponent],
  exports:        [MenuBookChapterComponent],
})
export class MenuBookChapterComponentModule {}
