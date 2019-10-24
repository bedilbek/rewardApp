import { Routes } from '@angular/router';
import { DriverComponent } from './list-drivers/driver.component';
import { AddDriverComponent } from './add-driver/add-driver.component';

export const DriversRoutes: Routes = [{
  path: '',
  component: DriverComponent
},{
  path: 'add',
  component: AddDriverComponent
}, {
  path: 'edit/:id',
  component: AddDriverComponent
}];
