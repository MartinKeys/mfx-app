import { Component, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { ConstructionSettingsComponent } from 'src/app/components/construction-settings/construction-settings.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-starter',
  standalone: true,
  imports: [
    MaterialModule,
    ConstructionSettingsComponent,
    TranslateModule
  ],
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StarterComponent {}
