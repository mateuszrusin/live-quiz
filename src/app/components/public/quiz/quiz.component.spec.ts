import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzesComponent } from './quiz.component';

describe('EnterComponent', () => {
  let component: QuizzesComponent;
  let fixture: ComponentFixture<QuizzesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
