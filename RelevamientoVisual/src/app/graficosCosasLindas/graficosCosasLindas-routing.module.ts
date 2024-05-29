import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GraficosCosasLindasPage } from './graficosCosasLindas.page';

const routes: Routes = [
  {
    path: '',
    component: GraficosCosasLindasPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GraficosCosasLindasPageRoutingModule {}
