import { Component } from '@angular/core';
import { ConstructionSettingsComponent } from 'src/app/components/construction-settings/construction-settings.component';

@Component({
  selector: 'app-construction-dialog',
  standalone: true,
  imports: [
    ConstructionSettingsComponent
  ],
  templateUrl: './construction-dialog.component.html',
  styleUrl: './construction-dialog.component.scss'
})
export class ConstructionDialogComponent {

}
