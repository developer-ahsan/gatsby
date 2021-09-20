import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepagedataComponent } from './homepagedata.component';

describe('HomepagedataComponent', () => {
  let component: HomepagedataComponent;
  let fixture: ComponentFixture<HomepagedataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepagedataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepagedataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
