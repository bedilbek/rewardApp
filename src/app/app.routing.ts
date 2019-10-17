import { Routes } from '@angular/router';
import { AppBlankComponent } from './layouts/blank/blank.component';

export const AppRoutes: Routes = [
  {
    path: "",
    loadChildren: () => import('./components/main.module').then(m => m.MainModule)
  },
  // {
  //   path: '',
  //   component: AppBlankComponent,
  //   children: [{ 
  //     path: '', 
  //     redirectTo: '/starter', 
  //     pathMatch: 'full' 
  //   }, {
  //     path: 'starter',
  //     loadChildren: './starter/starter.module#StarterModule'
  //   }]
// }
];

