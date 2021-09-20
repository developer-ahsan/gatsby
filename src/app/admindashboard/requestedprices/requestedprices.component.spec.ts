import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestedpricesComponent } from './requestedprices.component';

describe('RequestedpricesComponent', () => {
  let component: RequestedpricesComponent;
  let fixture: ComponentFixture<RequestedpricesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestedpricesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestedpricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
