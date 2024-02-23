import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalTypeComponent } from './goal-type.component';

describe('GoalTypeComponent', () => {
  let component: GoalTypeComponent;
  let fixture: ComponentFixture<GoalTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoalTypeComponent]
    });
    fixture = TestBed.createComponent(GoalTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
