import { Component } from '@angular/core';
import { ConstructionSettingsComponent } from 'src/app/components/construction-settings/construction-settings.component';
import { ConstructionResultsComponent } from 'src/app/components/construction-results/construction-results.component';
import { VisualisationComponent } from 'src/app/components/visualisation/visualisation.component';

@Component({
  selector: 'app-construction',
  standalone: true,
  imports: [
    ConstructionSettingsComponent,
    ConstructionResultsComponent,
    VisualisationComponent
  ],
  templateUrl: './construction.component.html',
  styleUrl: './construction.component.scss'
})
export class ConstructionComponent {

}
