import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollItemsComponent } from './payroll-items.component';

describe('PayrollItemsComponent', () => {
  let component: PayrollItemsComponent;
  let fixture: ComponentFixture<PayrollItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayrollItemsComponent]
    });
    fixture = TestBed.createComponent(PayrollItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
