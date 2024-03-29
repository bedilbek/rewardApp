import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UsersComponent } from './users/users.component';
import { SharedModule } from '../../../shared/shared.module';
import { UsersRoutes } from './users.routing';
import { AddUserComponent } from './add-user/add-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(UsersRoutes)
    
  ],
  declarations: [ UsersComponent, AddUserComponent ]
})

export class UsersModule {}
