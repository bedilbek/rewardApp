import { Routes } from '@angular/router';
import { AppBlankComponent } from './layouts/blank/blank.component';
import { NotFoundComponent } from './auth/not-found/not-found.component';

export const AppRoutes: Routes = [
  {
    path: "",
    loadChildren: () => import('./components/main.module').then(m => m.MainModule)
  },
  {
    path: "",
    component: AppBlankComponent,
    children: [
      {
        path: "login",
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      },
      {
        path: "404",
        component: NotFoundComponent
      },
      {
        path: "auth",
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      },
    ]
  },
  { 
    path: "**",
    redirectTo: "/404"
  }
];

