import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { FullComponent } from '../layouts/full/full.component';

const routes: Routes = [{
  path: '', component: MainComponent, children: [
    {
      path: "",
      component: FullComponent,
      children: [
        {
          path: "",
          redirectTo: "/dispatchers",
          pathMatch: "full"
        },
        {
          path: "dispatchers",
          loadChildren:
            () => import('./management/dispatcher/dispatcher.module').then(m => m.DispatcherModule)
        },
        {
          path: "users",
          loadChildren:
            () => import('./management/users/users.module').then(m => m.UsersModule)
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
