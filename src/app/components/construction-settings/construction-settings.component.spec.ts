import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructionSettingsComponent } from './construction-settings.component';

describe('ConstructionSettingsComponent', () => {
  let component: ConstructionSettingsComponent;
  let fixture: ComponentFixture<ConstructionSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConstructionSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConstructionSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
