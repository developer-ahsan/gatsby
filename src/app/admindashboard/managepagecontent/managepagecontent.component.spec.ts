import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagepagecontentComponent } from './managepagecontent.component';

describe('ManagepagecontentComponent', () => {
  let component: ManagepagecontentComponent;
  let fixture: ComponentFixture<ManagepagecontentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagepagecontentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagepagecontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
