import { Routes } from '@angular/router';
import { FullComponent } from './layout/full.component';
import { StarterComponent } from './pages/starter/starter.component';
import { ConstructionComponent } from './pages/construction/construction.component';
import { ConstructionSettingsComponent } from './components/construction-settings/construction-settings.component';
import { ConstructionResultsComponent } from './components/construction-results/construction-results.component';
import { VisualizationComponent } from './components/visualization/visualization.component';

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: 'home',
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
      {
        path: 'construction-results',
        component: ConstructionResultsComponent,
      },
      {
        path: 'visualization',
        component: VisualizationComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'authentication/error',
  },
];
