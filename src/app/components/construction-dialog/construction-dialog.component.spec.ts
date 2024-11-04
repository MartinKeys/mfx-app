import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructionDialogComponent } from './construction-dialog.component';

describe('ConstructionDialogComponent', () => {
  let component: ConstructionDialogComponent;
  let fixture: ComponentFixture<ConstructionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConstructionDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConstructionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
