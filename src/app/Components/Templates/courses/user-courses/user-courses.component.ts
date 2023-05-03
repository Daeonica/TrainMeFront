import { Component } from '@angular/core';
import { CourseService } from 'src/app/Services/course/course.service';
import { CryptoJsService } from 'src/app/Services/crypto-js/crypto-js.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-courses',
  templateUrl: './user-courses.component.html',
  styleUrls: ['./user-courses.component.css']
})
export class UserCoursesComponent {
  allCourses: any;
  cookie: any;
  user: any;
  loading = true;

  constructor(private cryptoJsService: CryptoJsService, private courseService: CourseService, private cookieService: CookieService) {
    this.cookie = this.cookieService.get("user");
  }

  ngOnInit() {
    this.user = this.cryptoJsService.decrypt(this.cookie);
    this.courseService.trainerCourses(this.user.id).subscribe(response => {
      console.log(response);
      this.allCourses = response;
      this.loading = false;
    },
      error => {
        this.loading = false;

      });



  }


}
