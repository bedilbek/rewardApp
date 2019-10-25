import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { DispatcherComponent, DialogChooseDispatcher } from "./dispatcher.component";
import { DispatcherRoutes } from "./dispatcher.routing";
import { SharedModule } from "../../../shared/shared.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(DispatcherRoutes)
  ],
  declarations: [DispatcherComponent, DialogChooseDispatcher],
  
  entryComponents: [DialogChooseDispatcher]
})
export class DispatcherModule {}
