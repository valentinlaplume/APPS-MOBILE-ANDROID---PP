import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatAulaBPage } from './chat-aula-b.page';

const routes: Routes = [
  {
    path: '',
    component: ChatAulaBPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatAulaBPageRoutingModule {}
