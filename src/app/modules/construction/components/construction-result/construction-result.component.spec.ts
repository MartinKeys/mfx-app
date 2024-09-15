import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructionResultComponent } from './construction-result.component';

describe('ConstructionResultComponent', () => {
  let component: ConstructionResultComponent;
  let fixture: ComponentFixture<ConstructionResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstructionResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConstructionResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
