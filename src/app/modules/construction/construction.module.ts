import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../material/material.module';

import { ConstructionRoutingModule } from './construction-routing.module';
import { ConstructionSelectionComponent } from './components/construction-selection/construction-selection.component';
import { ConstructionResultComponent } from './components/construction-result/construction-result.component';


@NgModule({
  declarations: [
    ConstructionSelectionComponent,
    ConstructionResultComponent
  ],
  imports: [
    CommonModule,
    ConstructionRoutingModule,
    MaterialModule
  ]
})
export class ConstructionModule { }
