import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetStudentsByCourseComponent } from './get-students-by-course.component';

describe('GetStudentsByCourseComponent', () => {
  let component: GetStudentsByCourseComponent;
  let fixture: ComponentFixture<GetStudentsByCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetStudentsByCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetStudentsByCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
