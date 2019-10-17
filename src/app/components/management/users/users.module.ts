import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UsersComponent } from './users/users.component';
import { SharedModule } from '../../../shared/shared.module';
import { UsersRoutes } from './users.routing';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FlexLayoutModule,
    RouterModule.forChild(UsersRoutes)
    
  ],
  declarations: [ UsersComponent ]
})

export class UsersModule {}
