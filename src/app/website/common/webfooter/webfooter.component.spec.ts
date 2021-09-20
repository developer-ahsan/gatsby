import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebfooterComponent } from './webfooter.component';

describe('WebfooterComponent', () => {
  let component: WebfooterComponent;
  let fixture: ComponentFixture<WebfooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebfooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
