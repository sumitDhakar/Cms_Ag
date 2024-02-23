import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplicantsComponent } from './job-applicants.component';

describe('JobApplicantsComponent', () => {
  let component: JobApplicantsComponent;
  let fixture: ComponentFixture<JobApplicantsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobApplicantsComponent]
    });
    fixture = TestBed.createComponent(JobApplicantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
