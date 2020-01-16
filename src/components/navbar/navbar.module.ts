import { NgModule } from '@angular/core';
import {Navbar} from './navbar.component';
import {IonicPageModule} from 'ionic-angular';

@NgModule({
  imports:        [IonicPageModule.forChild(Navbar)],
  declarations:   [Navbar],
  exports:        [Navbar],
})

export class NavbarModule {}

