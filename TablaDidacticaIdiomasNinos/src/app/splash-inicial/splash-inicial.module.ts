import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SplashInicialPageRoutingModule } from './splash-inicial-routing.module';

import { SplashInicialPage } from './splash-inicial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SplashInicialPageRoutingModule
  ],
  declarations: [SplashInicialPage]
})
export class SplashInicialPageModule {}
