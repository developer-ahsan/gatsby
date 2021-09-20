import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittedpricesComponent } from './submittedprices.component';

describe('SubmittedpricesComponent', () => {
  let component: SubmittedpricesComponent;
  let fixture: ComponentFixture<SubmittedpricesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmittedpricesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmittedpricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
