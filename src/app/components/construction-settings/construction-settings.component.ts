import { Component, ViewChild, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators, NonNullableFormBuilder, FormControl } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module'; // Ensure this module includes necessary Angular Material modules
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-construction-settings',
  standalone: true,
  imports: [MaterialModule, NgFor],
  templateUrl: './construction-settings.component.html',
  styleUrls: ['./construction-settings.component.scss'],
})
export class ConstructionSettingsComponent implements OnInit {
  @ViewChild('stepper') private myStepper: MatStepper;

  // Inject services
  private _formBuilder = inject(FormBuilder) as NonNullableFormBuilder;
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private initialLoad = true;
  constructionType: number | null = null;
  profileLength: number | null = null;
  loadType: number | null = null;
  profileType: string | null = null;

  // Define form groups with explicit control types
  firstFormGroup = this._formBuilder.group({
    constructionType: this._formBuilder.control<number | null>(null, Validators.required),
  });
  secondFormGroup = this._formBuilder.group({
    profileLength: this._formBuilder.control<number | null>(null, Validators.required),
  });
  thirdFormGroup = this._formBuilder.group({
    loadType: this._formBuilder.control<number | null>(null, Validators.required),
  });
  fourthFormGroup = this._formBuilder.group({
    profileType: this._formBuilder.control<string | null>(null, Validators.required),
  });

  ngOnInit() {
    // Subscribe to value changes and update parameters
    this.firstFormGroup.get('constructionType')!.valueChanges.subscribe((value) => {
      this.constructionType = Number(value);
      if (!this.initialLoad) {
        this.updateQueryParams();
        this.setStepperIndex();
      }
    });
    this.secondFormGroup.get('profileLength')!.valueChanges.subscribe((value) => {
      this.profileLength = Number(value);
      if (!this.initialLoad) {
        this.updateQueryParams();
        this.setStepperIndex();
      }
    });
    this.thirdFormGroup.get('loadType')!.valueChanges.subscribe((value) => {
      this.loadType = Number(value);
      if (!this.initialLoad) {
        this.updateQueryParams();
        this.setStepperIndex();
      }
    });
    this.fourthFormGroup.get('profileType')!.valueChanges.subscribe((value) => {
      this.profileType = value;
      if (!this.initialLoad) {
        this.updateQueryParams();
        this.setStepperIndex();
      }
    });

    // Read query parameters from URL and set form controls accordingly
    this.route.queryParams.subscribe((params) => {
      // console.log('Received query parameters:', params); // Debugging
      // Set form controls if parameters exist
      if (params['constructionType'] !== undefined) {
        this.firstFormGroup.controls['constructionType'].setValue(Number(params['constructionType']));
        this.constructionType = Number(params['constructionType']);
      }
      if (params['profileLength'] !== undefined) {
        this.secondFormGroup.controls['profileLength'].setValue(Number(params['profileLength']));
        this.profileLength = Number(params['profileLength']);
      }
      if (params['loadType'] !== undefined) {
        this.thirdFormGroup.controls['loadType'].setValue(Number(params['loadType']));
        this.loadType = Number(params['loadType']);
      }
      if (params['profileType'] !== undefined) {
        this.fourthFormGroup.controls['profileType'].setValue(params['profileType']);
        this.profileType = params['profileType'];
      }
      // Force validity update
      this.firstFormGroup.updateValueAndValidity({ onlySelf: true });
      this.secondFormGroup.updateValueAndValidity({ onlySelf: true });
      this.thirdFormGroup.updateValueAndValidity({ onlySelf: true });
      this.fourthFormGroup.updateValueAndValidity({ onlySelf: true });
      // After setting initial values, reset the flag
      this.initialLoad = false;
      // Defer the call to setStepperIndex to ensure form validity has been updated
      setTimeout(() => {
        this.setStepperIndex();
      });
    });
  }

  setStepperIndex() {
    let highestValidStep = 0;
    if (this.firstFormGroup.valid) highestValidStep = 1;
    if (this.secondFormGroup.valid) highestValidStep = 2;
    if (this.thirdFormGroup.valid) highestValidStep = 3;
    if (this.fourthFormGroup.valid) highestValidStep = 3; // Last index is 3 (0-based)
    // Mark previous steps as completed
    this.myStepper.steps.forEach((step, index) => {
      step.completed = index < highestValidStep;
    });
    // Set the stepper to the highest valid step
    this.myStepper.selectedIndex = highestValidStep;
  }

  updateQueryParams() {
    const queryParams: any = {
      constructionType: this.constructionType,
      profileLength: this.profileLength,
      loadType: this.loadType,
      profileType: this.profileType,
    };
    // Remove undefined or null parameters
    Object.keys(queryParams).forEach(
      (key) =>
        (queryParams[key] === undefined || queryParams[key] === null || queryParams[key] === '') &&
        delete queryParams[key]
    );
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }

  // Methods to set values when icons are clicked
  setConstructionType(value: number) {
    this.firstFormGroup.controls['constructionType'].setValue(value);
  }
  setLoadType(value: number) {
    this.thirdFormGroup.controls['loadType'].setValue(value);
  }
}
