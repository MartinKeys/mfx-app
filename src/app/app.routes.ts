import { Routes } from '@angular/router';
import { FullComponent } from './layout/full.component';

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.routes').then((m) => m.PagesRoutes),
      },
      // {
      //   path: 'ui-components',
      //   loadChildren: () =>
      //     import('./pages/ui-components/ui-components.routes').then(
      //       (m) => m.UiComponentsRoutes
      //     ),
      // },
      // {
      //   path: 'extra',
      //   loadChildren: () =>
      //     import('./pages/extra/extra.routes').then((m) => m.ExtraRoutes),
      // },
    ],
  },

  // PAGES
  
  // {
  //   path: '',
  //   component: BlankComponent,
  //   children: [
  //     {
  //       path: 'authentication',
  //       loadChildren: () =>
  //         import('./pages/authentication/authentication.routes').then(
  //           (m) => m.AuthenticationRoutes
  //         ),
  //     },
  //   ],
  // },
  {
    path: '**',
    redirectTo: 'authentication/error',
  },
];