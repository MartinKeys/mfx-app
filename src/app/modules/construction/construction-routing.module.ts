import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConstructionSelectionComponent } from './components/construction-selection/construction-selection.component';
import { ConstructionResultComponent } from './components/construction-result/construction-result.component';

const routes: Routes = [
  { path: '', component: ConstructionSelectionComponent },
  { path: 'result', component: ConstructionResultComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConstructionRoutingModule { }
