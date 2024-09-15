import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, 
  // {
  //   path: '',
  //   component: AdminLayoutComponent,
  //   children: [{
  //     path: '',
  //     loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
  //   }]
  // }
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
       path: '',
       loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
      },
      {
        path: 'construction',
        loadChildren: () => import('./modules/construction/construction.module').then(m => m.ConstructionModule)
      },
      {
        path: 'visualization3d',
        loadChildren: () => import('./modules/visualization3d/visualization3d.module').then(m => m.Visualization3dModule)
      },
      {
        path: 'charts',
        loadChildren: () => import('./modules/charts/charts.module').then(m => m.ChartsModule)
      },
      {
        path: 'pdf-export',
        loadChildren: () => import('./modules/pdf-export/pdf-export.module').then(m => m.PdfExportModule)
      },
      // ... other routes
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
