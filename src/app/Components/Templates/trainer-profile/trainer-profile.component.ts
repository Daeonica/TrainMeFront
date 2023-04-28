import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/Services/course/course.service';
import { url } from 'src/app/Services/proxy';
import { UserService } from 'src/app/Services/user/user.service';

@Component({
  selector: 'app-trainer-profile',
  templateUrl: './trainer-profile.component.html',
  styleUrls: ['./trainer-profile.component.css']
})
export class TrainerProfileComponent {
  @Input() trainer: any;
  @Output() trainerChange = new EventEmitter<any>();

  @Input() courses: any;
  @Output() coursesChange = new EventEmitter<any>();

  id: any;
  url = url;



  constructor(private userService: UserService, private route: ActivatedRoute, private courseService: CourseService) {


  }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getTrainer();
    this.getTrainerCourses();
  }

  getTrainer() {
    this.userService.getUserById(this.id).subscribe((res: any) => {
      this.trainer = res;
      this.trainerChange.emit(res);
    })
  }

  getTrainerCourses() {
    console.log(this.id);
    this.courseService.trainerCourses(this.id).subscribe((res: any) => {
      this.courses = res;
      this.coursesChange.emit(res)
      console.log(res)
    }
    )
  }

}
