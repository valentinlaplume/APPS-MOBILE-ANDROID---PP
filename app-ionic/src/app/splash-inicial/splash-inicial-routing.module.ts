import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SplashInicialPage } from './splash-inicial.page';

const routes: Routes = [
  {
    path: '',
    component: SplashInicialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SplashInicialPageRoutingModule {}
