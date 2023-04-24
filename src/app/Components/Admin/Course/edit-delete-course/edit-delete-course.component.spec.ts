import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeleteCourseComponent } from './edit-delete-course.component';

describe('EditDeleteCourseComponent', () => {
  let component: EditDeleteCourseComponent;
  let fixture: ComponentFixture<EditDeleteCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDeleteCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDeleteCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
