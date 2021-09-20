import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelandcategoryComponent } from './modelandcategory.component';

describe('ModelandcategoryComponent', () => {
  let component: ModelandcategoryComponent;
  let fixture: ComponentFixture<ModelandcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelandcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelandcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
