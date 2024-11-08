import { Component, ViewChild, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators, NonNullableFormBuilder, FormControl } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module'; // Ensure this module includes necessary Angular Material modules
import { NgFor } from '@angular/common';
import { ConstructionCalcService } from 'src/app/services/construction-calc.service';
import { ThreejsService } from 'src/app/services/threejs.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-construction-settings',
  standalone: true,
  imports: [MaterialModule, NgFor],
  templateUrl: './construction-settings.component.html',
  styleUrls: ['./construction-settings.component.scss'],
})
export class ConstructionSettingsComponent implements OnInit {
  @ViewChild('stepper') private parametersStepper: MatStepper;
  // Inject services
  private _formBuilder = inject(FormBuilder) as NonNullableFormBuilder;
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private calcService = inject(ConstructionCalcService);
  private threeService = inject(ThreejsService);
  // Declare variables
  private constructionType: number | null = null;
  private profileLength: number | null = null;
  private profileType: string | null = null;
  private loadType: number | null = null;
  private formChanges$ = new Subject<void>();

  // Define form groups
  firstFormGroup = this._formBuilder.group({
    constructionType: this._formBuilder.control<number | null>(null, Validators.required),
  });
  secondFormGroup = this._formBuilder.group({
    profileLength: this._formBuilder.control<number | null>(null, Validators.required),
  }); 
  thirdFormGroup = this._formBuilder.group({
    profileType: this._formBuilder.control<string | null>(null, Validators.required),
  });
  fourthFormGroup = this._formBuilder.group({
    loadType: this._formBuilder.control<number | null>(null, Validators.required),
  });

  ngOnInit() {
    // Subscribe to value changes and update parameters
    this.firstFormGroup.get('constructionType')!.valueChanges.subscribe((value) => {
      const newValue = Number(value);
      if (this.constructionType !== newValue) {
        this.constructionType = newValue;
        this.formChanges$.next();
      }
    });
    this.secondFormGroup.get('profileLength')!.valueChanges.subscribe((value) => {
      const newValue = Number(value);
      if (this.profileLength !== newValue) {
        this.profileLength = newValue;
        this.formChanges$.next();
      }
    });
    this.thirdFormGroup.get('profileType')!.valueChanges.subscribe((value) => {
      if (this.profileType !== value) {
        this.profileType = value;
        this.formChanges$.next();
      }
    });
    this.fourthFormGroup.get('loadType')!.valueChanges.subscribe((value) => {
      const newValue = Number(value);
      if (this.loadType !== newValue) {
        this.loadType = newValue;
        this.formChanges$.next();
      }
    });
    // Subscribe to formChanges$ with debounceTime
    this.formChanges$
      .pipe(debounceTime(50)) // ensures that rapid changes result in only one call to checkAndUpdateScene()
      .subscribe(() => {
        this.updateQueryParams();
        this.setStepperIndex();
        this.checkAndUpdateScene();
      });

    // Read query parameters from URL and set form controls accordingly
    this.route.queryParams.subscribe((params) => {
      // Set form controls if parameters exist
      if (params['constructionType'] !== undefined) {
        this.firstFormGroup.controls['constructionType'].setValue(
          Number(params['constructionType']),
          { emitEvent: false } // Prevent triggering valueChanges
        );
        this.constructionType = Number(params['constructionType']);
      }
      if (params['profileLength'] !== undefined) {
        this.secondFormGroup.controls['profileLength'].setValue(
          Number(params['profileLength']),
          { emitEvent: false }
        );
        this.profileLength = Number(params['profileLength']);
      }
      if (params['profileType'] !== undefined) {
        this.thirdFormGroup.controls['profileType'].setValue(
          params['profileType'],
          { emitEvent: false }
        );
        this.profileType = params['profileType'];
      }
      if (params['loadType'] !== undefined) {
        this.fourthFormGroup.controls['loadType'].setValue(
          Number(params['loadType']),
          { emitEvent: false }
        );
        this.loadType = Number(params['loadType']);
      }
      // Force validity update
      this.firstFormGroup.updateValueAndValidity({ onlySelf: true });
      this.secondFormGroup.updateValueAndValidity({ onlySelf: true });
      this.thirdFormGroup.updateValueAndValidity({ onlySelf: true });
      this.fourthFormGroup.updateValueAndValidity({ onlySelf: true });

      // Defer the call to setStepperIndex to ensure form validity has been updated
      setTimeout(() => {
        this.setStepperIndex();
      });
    });
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

  setStepperIndex() {
    let highestValidStep = 0;
    if (this.firstFormGroup.valid) highestValidStep = 1;
    if (this.secondFormGroup.valid) highestValidStep = 2;
    if (this.thirdFormGroup.valid) highestValidStep = 3;
    if (this.fourthFormGroup.valid) highestValidStep = 3; // Last index is 3 (0-based)
    // Mark previous steps as completed
    this.parametersStepper.steps.forEach((step, index) => {
      step.completed = index < highestValidStep;
    });
    // Set the stepper to the highest valid step
    this.parametersStepper.selectedIndex = highestValidStep;
  }

  // Methods to set values when icons are clicked
  setConstructionType(value: number) {
    this.firstFormGroup.controls['constructionType'].setValue(value);
  }
  setLoadType(value: number) {
    this.fourthFormGroup.controls['loadType'].setValue(value);
  }

  // Method to check if all parameters are set
  allParametersSet(): boolean {
    return (
      this.firstFormGroup.valid &&
      this.secondFormGroup.valid &&
      this.thirdFormGroup.valid &&
      this.fourthFormGroup.valid
    );
  }

  // Method to check updates and call scene update
  private checkAndUpdateScene() {
    if (this.allParametersSet()) {
      this.threeService.updateScene({
        constructionType: this.constructionType!,
        profileLength: this.profileLength!,
        loadType: this.loadType!,
        profileType: this.profileType!,
      });
    }
  }
}
