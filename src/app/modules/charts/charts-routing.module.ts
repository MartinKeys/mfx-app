import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoadChartComponent } from './components/load-chart/load-chart.component';

const routes: Routes = [
  { path: '', component: LoadChartComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartsRoutingModule { }
