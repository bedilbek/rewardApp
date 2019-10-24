import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DriversRoutes } from './driver.routing';
import { DriverComponent } from './list-drivers/driver.component';
import { AddDriverComponent } from './add-driver/add-driver.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(DriversRoutes)
    
  ],
  declarations: [ DriverComponent, AddDriverComponent ]
})

export class DriversModule {}
