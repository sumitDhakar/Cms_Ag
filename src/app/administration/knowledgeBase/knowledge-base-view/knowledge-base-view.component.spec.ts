import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeBaseViewComponent } from './knowledge-base-view.component';

describe('KnowledgeBaseViewComponent', () => {
  let component: KnowledgeBaseViewComponent;
  let fixture: ComponentFixture<KnowledgeBaseViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KnowledgeBaseViewComponent]
    });
    fixture = TestBed.createComponent(KnowledgeBaseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
