import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceAppraiselComponent } from './performance-appraisel.component';

describe('PerformanceAppraiselComponent', () => {
  let component: PerformanceAppraiselComponent;
  let fixture: ComponentFixture<PerformanceAppraiselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerformanceAppraiselComponent]
    });
    fixture = TestBed.createComponent(PerformanceAppraiselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
