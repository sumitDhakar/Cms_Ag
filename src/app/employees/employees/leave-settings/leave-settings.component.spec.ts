import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveSettingsComponent } from './leave-settings.component';

describe('LeaveSettingsComponent', () => {
  let component: LeaveSettingsComponent;
  let fixture: ComponentFixture<LeaveSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaveSettingsComponent]
    });
    fixture = TestBed.createComponent(LeaveSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
