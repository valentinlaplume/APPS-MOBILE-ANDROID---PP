import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatAulaBPageRoutingModule } from './chat-aula-b-routing.module';

import { ChatAulaBPage } from './chat-aula-b.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatAulaBPageRoutingModule
  ],
  declarations: [ChatAulaBPage]
})
export class ChatAulaBPageModule {}
