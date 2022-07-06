import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminChatRoutingModule } from './admin-chat-routing.module';
import {AdminChatComponent} from "./admin-chat.component";


@NgModule({
  declarations: [
    AdminChatComponent
  ],
  imports: [
    CommonModule,
    AdminChatRoutingModule
  ]
})
export class AdminChatModule { }
