import { Component, ApplicationRef } from '@angular/core';
import { ConstructionSettingsComponent } from 'src/app/components/construction-settings/construction-settings.component';
import { ConstructionResultsComponent } from 'src/app/components/construction-results/construction-results.component';
import { VisualizationComponent } from 'src/app/components/visualization/visualization.component';

@Component({
  selector: 'app-construction',
  standalone: true,
  imports: [
    ConstructionSettingsComponent,
    ConstructionResultsComponent,
    VisualizationComponent
  ],
  templateUrl: './construction.component.html',
  styleUrl: './construction.component.scss'
})
export class ConstructionComponent {

}
