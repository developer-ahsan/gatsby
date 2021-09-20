import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestpriceComponent } from './requestprice.component';

describe('RequestpriceComponent', () => {
  let component: RequestpriceComponent;
  let fixture: ComponentFixture<RequestpriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestpriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestpriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
