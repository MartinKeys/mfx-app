import { Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';
import { ConstructionComponent } from './construction/construction.component';
import { ConstructionSettingsComponent } from '../components/construction-settings/construction-settings.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    component: StarterComponent,
    data: {
      title: 'Home',
      urls: [
        { title: 'Home', url: '/home' },
      ],
    },
  }
];
