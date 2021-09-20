import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittedPricesComponent } from './submitted-prices.component';

describe('SubmittedPricesComponent', () => {
  let component: SubmittedPricesComponent;
  let fixture: ComponentFixture<SubmittedPricesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmittedPricesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmittedPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
