import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceReportsComponent } from './invoice-reports.component';

describe('InvoiceReportsComponent', () => {
  let component: InvoiceReportsComponent;
  let fixture: ComponentFixture<InvoiceReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvoiceReportsComponent]
    });
    fixture = TestBed.createComponent(InvoiceReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
