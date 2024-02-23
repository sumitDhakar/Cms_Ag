import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEstimateComponent } from './create-estimate.component';

describe('CreateEstimateComponent', () => {
  let component: CreateEstimateComponent;
  let fixture: ComponentFixture<CreateEstimateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEstimateComponent]
    });
    fixture = TestBed.createComponent(CreateEstimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
