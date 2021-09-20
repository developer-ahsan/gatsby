import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitpriceComponent } from './submitprice.component';

describe('SubmitpriceComponent', () => {
  let component: SubmitpriceComponent;
  let fixture: ComponentFixture<SubmitpriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitpriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitpriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
