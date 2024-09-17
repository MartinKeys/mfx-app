import { Component, OnInit, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-construction-selection',
  templateUrl: './construction-selection.component.html',
  styleUrls: ['./construction-selection.component.scss']
})
export class ConstructionSelectionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

}
