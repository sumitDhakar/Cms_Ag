import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAttendenceComponent } from './employee-attendence.component';

describe('EmployeeAttendenceComponent', () => {
  let component: EmployeeAttendenceComponent;
  let fixture: ComponentFixture<EmployeeAttendenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeAttendenceComponent]
    });
    fixture = TestBed.createComponent(EmployeeAttendenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
