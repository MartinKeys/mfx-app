import { Routes } from '@angular/router';
import { FullComponent } from './layout/full.component';
import { StarterComponent } from './pages/starter/starter.component';
import { ConstructionComponent } from './pages/construction/construction.component';
import { ConstructionSettingsComponent } from './components/construction-settings/construction-settings.component';

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
        component: StarterComponent,
      },
      {
        path: 'construction',
        component: ConstructionComponent,
      },
      {
        path: 'construction-settings',
        component: ConstructionSettingsComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'authentication/error',
  },
];
