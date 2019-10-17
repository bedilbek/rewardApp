import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';

import { MainRoutingModule } from './main.routing';
import { SpinnerComponent } from '../shared/spinner.component';
import { FullComponent } from '../layouts/full/full.component';
import { SharedModule } from '../shared/shared.module';
import { AppHeaderComponent } from '../layouts/full/header/header.component';
import { AppSidebarComponent } from '../layouts/full/sidebar/sidebar.component';
import { AddUserComponent } from './management/users/add-user/add-user.component';
import { UsersComponent } from './management/users/users/users.component';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MainRoutingModule,
  ],
  declarations: [
    MainComponent,
    AppHeaderComponent,
    SpinnerComponent,
    AppSidebarComponent,
    FullComponent,
    AddUserComponent,
  ],
})
export class MainModule {
}
