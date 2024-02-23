import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeSettingsComponent } from './theme-settings.component';

describe('ThemeSettingsComponent', () => {
  let component: ThemeSettingsComponent;
  let fixture: ComponentFixture<ThemeSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThemeSettingsComponent]
    });
    fixture = TestBed.createComponent(ThemeSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
