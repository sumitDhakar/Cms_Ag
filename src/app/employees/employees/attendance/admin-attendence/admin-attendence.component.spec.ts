import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAttendenceComponent } from './admin-attendence.component';

describe('AdminAttendenceComponent', () => {
  let component: AdminAttendenceComponent;
  let fixture: ComponentFixture<AdminAttendenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAttendenceComponent]
    });
    fixture = TestBed.createComponent(AdminAttendenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
