import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { DispatcherComponent } from "./dispatcher.component";
import { DispatcherRoutes } from "./dispatcher.routing";
import { SharedModule } from "../../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(DispatcherRoutes)
  ],
  declarations: [DispatcherComponent],
})
export class DispatcherModule {}
