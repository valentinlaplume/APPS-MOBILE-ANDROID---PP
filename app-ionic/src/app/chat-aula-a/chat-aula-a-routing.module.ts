import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatAulaAPage } from './chat-aula-a.page';

const routes: Routes = [
  {
    path: '',
    component: ChatAulaAPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatAulaAPageRoutingModule {}
