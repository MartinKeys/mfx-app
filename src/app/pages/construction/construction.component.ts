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

  constructor(private appRef: ApplicationRef) {
    this.appRef.isStable.subscribe((isStable) => {
      if (isStable) {
        console.log('App is stable');
        // Remove the loading screen
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
          console.log('Removing loading screen');
          loadingScreen.style.display = 'none';
        } else {
          console.warn('Loading screen element not found');
        }
      }
    });
  }

}
