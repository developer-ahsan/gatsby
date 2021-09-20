import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagemembersComponent } from './managemembers.component';

describe('ManagemembersComponent', () => {
  let component: ManagemembersComponent;
  let fixture: ComponentFixture<ManagemembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagemembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagemembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
