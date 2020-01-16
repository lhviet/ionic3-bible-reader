import { NgModule }      from '@angular/core';
import {Filter} from './filter.pipe';

@NgModule({
  imports:        [],
  declarations:   [Filter],
  exports:        [Filter],
})

export class PipeModule {

  static forChild() {
    return {
      ngModule: PipeModule,
      providers: [],
    };
  }
}
