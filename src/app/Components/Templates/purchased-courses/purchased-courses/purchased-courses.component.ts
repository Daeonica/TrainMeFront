import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CourseService } from 'src/app/Services/course/course.service';
import { CryptoJsService } from 'src/app/Services/crypto-js/crypto-js.service';


@Component({
  selector: 'app-purchased-courses',
  templateUrl: './purchased-courses.component.html',
  styleUrls: ['./purchased-courses.component.css']
})
export class PurchasedCoursesComponent {
  allCourses: any;
  cookie: any;
  user: any;
  loading: boolean = true;

  constructor(private cryptoJsService: CryptoJsService, private courseService: CourseService, private cookieService: CookieService, private route: ActivatedRoute) {
    this.cookie = this.cookieService.get("user");
  }

  ngOnInit() {
    this.user = this.cryptoJsService.decrypt(this.cookie);
    this.courseService.getPurchasedCourses(this.route.snapshot.paramMap.get('id')).subscribe((data: any) => {
      let purchases = data.purchases;
      let courses = [];
      if (purchases != null) {
        for (let i = 0; i < purchases.length; i++) {
          courses.push(purchases[i].course);
        }
      }

      this.allCourses = courses;
      console.log(this.allCourses);
      this.loading = false;
    })
  }
}
