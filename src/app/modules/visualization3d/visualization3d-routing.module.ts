import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ThreeDModelComponent } from './components/three-d-model/three-d-model.component';

const routes: Routes = [
  { path: '', component: ThreeDModelComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Visualization3dRoutingModule { }
