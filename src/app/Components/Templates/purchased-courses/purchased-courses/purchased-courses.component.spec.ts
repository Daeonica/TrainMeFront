import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasedCoursesComponent } from './purchased-courses.component';

describe('PurchasedCoursesComponent', () => {
  let component: PurchasedCoursesComponent;
  let fixture: ComponentFixture<PurchasedCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasedCoursesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchasedCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
