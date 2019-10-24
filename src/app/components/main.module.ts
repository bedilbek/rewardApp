import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';

import { MainRoutingModule } from './main.routing';
import { SpinnerComponent } from '../shared/spinner.component';
import { FullComponent } from '../layouts/full/full.component';
import { SharedModule } from '../shared/shared.module';
import { AppHeaderComponent } from '../layouts/full/header/header.component';
import { AppSidebarComponent } from '../layouts/full/sidebar/sidebar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OrdersModule } from './orders/orders.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MainRoutingModule,
    FlexLayoutModule,
    OrdersModule,
    
  ],
  declarations: [
    MainComponent,
    AppHeaderComponent,
    SpinnerComponent,
    AppSidebarComponent,
    FullComponent,
    
  ],
})
export class MainModule {
}
