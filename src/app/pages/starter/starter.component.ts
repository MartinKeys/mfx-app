import { Component, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { ConstructionSettingsComponent } from 'src/app/components/construction-settings/construction-settings.component';

@Component({
  selector: 'app-starter',
  standalone: true,
  imports: [
    MaterialModule,
    ConstructionSettingsComponent
  ],
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StarterComponent {}
