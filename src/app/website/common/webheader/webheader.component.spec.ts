import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebheaderComponent } from './webheader.component';

describe('WebheaderComponent', () => {
  let component: WebheaderComponent;
  let fixture: ComponentFixture<WebheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
