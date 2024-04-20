import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SplashEstaticoPage } from './splash-estatico.page';

const routes: Routes = [
  {
    path: '',
    component: SplashEstaticoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SplashEstaticoPageRoutingModule {}
