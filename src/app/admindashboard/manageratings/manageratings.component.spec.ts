import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageratingsComponent } from './manageratings.component';

describe('ManageratingsComponent', () => {
  let component: ManageratingsComponent;
  let fixture: ComponentFixture<ManageratingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageratingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageratingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
