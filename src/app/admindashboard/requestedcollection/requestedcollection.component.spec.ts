import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestedcollectionComponent } from './requestedcollection.component';

describe('RequestedcollectionComponent', () => {
  let component: RequestedcollectionComponent;
  let fixture: ComponentFixture<RequestedcollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestedcollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestedcollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
