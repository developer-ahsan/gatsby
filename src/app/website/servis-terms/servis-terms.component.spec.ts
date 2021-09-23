import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServisTermsComponent } from './servis-terms.component';

describe('ServisTermsComponent', () => {
  let component: ServisTermsComponent;
  let fixture: ComponentFixture<ServisTermsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServisTermsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServisTermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
