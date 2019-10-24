import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { FullComponent } from '../layouts/full/full.component';
import { AuthGuard } from '../core';

const routes: Routes = [{
  path: '', component: MainComponent, children: [
    {
      path: "",
      component: FullComponent,
      canActivate: [AuthGuard],
      children: [
        {
          path: "",
          redirectTo: "/dispatchers",
          pathMatch: "full"
        },
        {
          path: "dispatchers",
          loadChildren:
            () => import('./management/dispatcher/dispatcher.module').then(m => m.DispatcherModule),
            canActivate: [AuthGuard]
        },
        {
          path: "users",
          loadChildren:
            () => import('./management/users/users.module').then(m => m.UsersModule),
            canActivate: [AuthGuard]
        },
        {
          path: "drivers",
          loadChildren:
            () => import('./management/driver/driver.module').then(m => m.DriversModule),
            canActivate: [AuthGuard]
        }
      ]
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
