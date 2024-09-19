import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructionResultsComponent } from './construction-results.component';

describe('ConstructionResultsComponent', () => {
  let component: ConstructionResultsComponent;
  let fixture: ComponentFixture<ConstructionResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConstructionResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConstructionResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
