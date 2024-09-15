import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructionSelectionComponent } from './construction-selection.component';

describe('ConstructionSelectionComponent', () => {
  let component: ConstructionSelectionComponent;
  let fixture: ComponentFixture<ConstructionSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstructionSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConstructionSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
