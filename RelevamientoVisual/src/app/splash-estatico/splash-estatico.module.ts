import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SplashEstaticoPageRoutingModule } from './splash-estatico-routing.module';

import { SplashEstaticoPage } from './splash-estatico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SplashEstaticoPageRoutingModule
  ],
  declarations: [SplashEstaticoPage]
})
export class SplashEstaticoPageModule {}
