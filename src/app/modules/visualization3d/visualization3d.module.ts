import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Visualization3dRoutingModule } from './visualization3d-routing.module';
import { ThreeDModelComponent } from './components/three-d-model/three-d-model.component';


@NgModule({
  declarations: [
    ThreeDModelComponent
  ],
  imports: [
    CommonModule,
    Visualization3dRoutingModule
  ]
})
export class Visualization3dModule { }
