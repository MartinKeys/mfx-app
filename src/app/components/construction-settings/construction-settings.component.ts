import { Component, inject, ViewChild } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { FormBuilder, Validators, NonNullableFormBuilder } from '@angular/forms';
import { NgFor } from '@angular/common';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-construction-settings',
  standalone: true,
  imports: [
    MaterialModule,
    NgFor
  ],
  templateUrl: './construction-settings.component.html',
  styleUrl: './construction-settings.component.scss'
})
export class ConstructionSettingsComponent {

  @ViewChild('stepper') private myStepper: MatStepper;

  private _formBuilder = inject(FormBuilder) as NonNullableFormBuilder;

  firstFormGroup = this._formBuilder.group({
    constructionType: this._formBuilder.control<number>(0, Validators.required),
  });
  secondFormGroup = this._formBuilder.group({
    profileLength: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    loadType: this._formBuilder.control<number>(2, Validators.required),
  });
  fourthFormGroup = this._formBuilder.group({
    profileType: ['', Validators.required],
  });

  // Variables to hold the parameters
  constructionType: number;
  profileLength: number;
  loadType: number;
  profileType: string;

  ngOnInit() {
    // Subscribe to value changes and log parameters using non-null assertion operator
    this.firstFormGroup.get('constructionType')!.valueChanges.subscribe((value) => {
      this.constructionType = Number(value);
    });
    this.secondFormGroup.get('profileLength')!.valueChanges.subscribe((value) => {
      this.profileLength = Number(value);
    });
    this.thirdFormGroup.get('loadType')!.valueChanges.subscribe((value) => {
      this.loadType = Number(value);
    });
    this.fourthFormGroup.get('profileType')!.valueChanges.subscribe((value) => {
      this.profileType = value;
    });
  }

  ngAfterViewInit() {
    // Subscribe to value changes and advance the stepper
    this.firstFormGroup.get('constructionType')!.valueChanges.subscribe((value) => {
      this.constructionType = Number(value);
      this.logParameters();

      if (this.firstFormGroup.valid) {
        this.myStepper.next();
      }
    });

    this.secondFormGroup.get('profileLength')!.valueChanges.subscribe((value) => {
      this.profileLength = Number(value);
      this.logParameters();

      // Defer the execution to allow the form validity to update
      setTimeout(() => {
        if (this.secondFormGroup.valid) {
          this.myStepper.next();
        }
      });
    });

    this.thirdFormGroup.get('loadType')!.valueChanges.subscribe((value) => {
      this.loadType = Number(value);
      this.logParameters();

      if (this.thirdFormGroup.valid) {
        this.myStepper.next();
      }
    });

    this.fourthFormGroup.get('profileType')!.valueChanges.subscribe((value) => {
      this.profileType = value;
      this.logParameters();
    });
  }

  logParameters() {
    console.log('Construction Type:', this.constructionType);
    console.log('Profile Length:', this.profileLength);
    console.log('Load Type:', this.loadType);
    console.log('Profile Type:', this.profileType);
  }

  // Methods to set values when icons are clicked
  setConstructionType(value: number) {
    this.firstFormGroup.controls['constructionType'].setValue(value);
  }

  setLoadType(value: number) {
    this.thirdFormGroup.controls['loadType'].setValue(value);
  }

}
