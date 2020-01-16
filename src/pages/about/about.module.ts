import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {AboutPage} from './about';
import {NavbarModule} from '../../components/navbar/navbar.module';

@NgModule({
  declarations: [
    AboutPage,
  ],
  imports: [
    NavbarModule,
    IonicPageModule.forChild(AboutPage),
  ],
  entryComponents: [
    AboutPage
  ]
})
export class AboutModule {}
