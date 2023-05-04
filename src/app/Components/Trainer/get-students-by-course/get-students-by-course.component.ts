import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/Services/course/course.service';

@Component({
  selector: 'app-get-students-by-course',
  templateUrl: './get-students-by-course.component.html',
  styleUrls: ['./get-students-by-course.component.css']
})
export class GetStudentsByCourseComponent {

  users: any;
  loading: boolean = true;

  constructor(private route: ActivatedRoute, private courseService: CourseService) { }

  ngOnInit(): void {
    this.getStudentsByCourse();
  }

  getStudentsByCourse() {
    this.courseService.getUsersPurchasedCourses(this.route.snapshot.paramMap.get('id')).subscribe((res: any) => {
      this.users = res;
      this.loading = false;
      console.log(this.users);
    })
  }


}
