import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PdfExportComponent } from './components/pdf-export/pdf-export.component';

const routes: Routes = [
  { path: '', component: PdfExportComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PdfExportRoutingModule { }
