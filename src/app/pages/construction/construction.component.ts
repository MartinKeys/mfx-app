import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConstructionSettingsComponent } from 'src/app/components/construction-settings/construction-settings.component';
import { ConstructionResultsComponent } from 'src/app/components/construction-results/construction-results.component';
import { VisualizationComponent } from 'src/app/components/visualization/visualization.component';
import { ConstructionDialogComponent } from 'src/app/components/construction-dialog/construction-dialog.component';

@Component({
  selector: 'app-construction',
  standalone: true,
  imports: [
    MatDialogModule,
    ConstructionSettingsComponent,
    ConstructionResultsComponent,
    VisualizationComponent,
    ConstructionDialogComponent
  ],
  templateUrl: './construction.component.html',
  styleUrl: './construction.component.scss'
})
export class ConstructionComponent {

  constructor(private dialog: MatDialog) { }

  openDialog(): void {
    this.dialog.open(ConstructionDialogComponent, {
      width: '80%',
      height: '80%',
    });
  }

}
