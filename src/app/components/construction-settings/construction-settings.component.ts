import {Component, inject} from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import {FormBuilder, Validators} from '@angular/forms';
@Component({
  selector: 'app-construction-settings',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './construction-settings.component.html',
  styleUrl: './construction-settings.component.scss'
})
export class ConstructionSettingsComponent {

  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

}
