import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TemplatesRoutingModule} from './templates-routing.module';
import {HomePageComponent} from './home-page/home-page.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {ModalComponent} from "./modal/modal.component";

@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    ModalComponent
  ],
  imports     : [
    CommonModule,
    TemplatesRoutingModule
  ]
})
export class TemplatesModule {
}
