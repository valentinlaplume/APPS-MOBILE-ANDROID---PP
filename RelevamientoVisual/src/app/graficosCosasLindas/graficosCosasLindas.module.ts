import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GraficosCosasLindasPageRoutingModule } from './graficosCosasLindas-routing.module';

import { GraficosCosasLindasPage } from './graficosCosasLindas.page';
import { NgChartsModule } from 'ng2-charts';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GraficosCosasLindasPageRoutingModule,
    NgChartsModule,
  ],
  declarations: [GraficosCosasLindasPage],
})
export class GraficosCosasLindasPageModule {}
