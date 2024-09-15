import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PdfExportRoutingModule } from './pdf-export-routing.module';
import { PdfExportComponent } from './components/pdf-export/pdf-export.component';


@NgModule({
  declarations: [
    PdfExportComponent
  ],
  imports: [
    CommonModule,
    PdfExportRoutingModule
  ]
})
export class PdfExportModule { }
