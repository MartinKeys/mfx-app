import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { ConstructionRoutingModule } from './construction-routing.module';

import { ConstructionSelectionComponent } from './components/construction-selection/construction-selection.component';
import { ConstructionResultComponent } from './components/construction-result/construction-result.component';
import { ThreeDModelComponent } from './components/three-d-model/three-d-model.component';
import { LoadChartComponent } from './components/load-chart/load-chart.component';
import { PdfExportComponent } from './components/pdf-export/pdf-export.component';


@NgModule({
  declarations: [
    ConstructionSelectionComponent,
    ConstructionResultComponent,
    ThreeDModelComponent,
    LoadChartComponent,
    PdfExportComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ConstructionRoutingModule
  ]
})
export class ConstructionModule { }
