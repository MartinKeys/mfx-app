import { Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';
import { ConstructionComponent } from './construction/construction.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    component: StarterComponent,
    data: {
      title: 'Starter',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
      ],
    },
  },
  {
    path: 'construction',
    component: ConstructionComponent,
    data: {
      title: 'Construction',
      urls: [
        { title: 'Construction', url: '/construction' },
      ],
    },
  },
];
