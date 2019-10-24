import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  exports: [OrdersComponent],
  declarations: [OrdersComponent],
  entryComponents: [OrdersComponent]
})
export class OrdersModule { }
