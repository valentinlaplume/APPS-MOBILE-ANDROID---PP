import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatAulaAPageRoutingModule } from './chat-aula-a-routing.module';

import { ChatAulaAPage } from './chat-aula-a.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatAulaAPageRoutingModule
  ],
  declarations: [ChatAulaAPage]
})
export class ChatAulaAPageModule {}
