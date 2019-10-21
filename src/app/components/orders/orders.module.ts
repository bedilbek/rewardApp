import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [OrdersComponent],
  declarations: [OrdersComponent],
  entryComponents: [OrdersComponent]
})
export class OrdersModule { }
