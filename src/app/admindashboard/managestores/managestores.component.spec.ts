import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagestoresComponent } from './managestores.component';

describe('ManagestoresComponent', () => {
  let component: ManagestoresComponent;
  let fixture: ComponentFixture<ManagestoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagestoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagestoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
