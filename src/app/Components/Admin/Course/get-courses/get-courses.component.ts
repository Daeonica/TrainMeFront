import { Component } from '@angular/core';
import { CourseService } from 'src/app/Services/course/course.service';
import { CryptoJsService } from 'src/app/Services/crypto-js/crypto-js.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-get-courses',
  templateUrl: './get-courses.component.html',
  styleUrls: ['./get-courses.component.css']
})
export class GetCoursesComponent {
  allCourses: any;
  cookie: any;
  user:any;

  constructor(private cryptoJsService: CryptoJsService, private courseService: CourseService,  private cookieService: CookieService) {
    this.cookie = this.cookieService.get("user");
  }

  ngOnInit() {
    this.user = this.cryptoJsService.decrypt(this.cookie);

    this.courseService.courses().subscribe(response => {
        console.log(response);
        this.allCourses = response;
      },
        error => {

        });



  }


}
