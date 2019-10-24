import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './add-user/add-user.component';

export const UsersRoutes: Routes = [{
  path: '',
  component: UsersComponent
},{
  path: 'add',
  component: AddUserComponent
}, {
  path: 'edit/:id',
  component: AddUserComponent
}];
