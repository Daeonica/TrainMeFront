import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CourseService } from 'src/app/Services/course/course.service';
import { CryptoJsService } from 'src/app/Services/crypto-js/crypto-js.service';
import { url } from 'src/app/Services/proxy';

@Component({
  selector: 'app-courses-search',
  templateUrl: './courses-search.component.html',
  styleUrls: ['./courses-search.component.css']
})
export class CoursesSearchComponent {
  all_courses: any;
  coursesToShow: any;
  url = url;
  search: any;
  loading = true;

  constructor(private courseService: CourseService) {
  }

  ngOnInit(): void {
    this.courseService.courses().subscribe((res: any) => {
      this.all_courses = res;
      this.coursesToShow = res;
      this.loading = false;
    }
    );
  }

  query() {
    this.coursesToShow = this.all_courses.filter((trainer: any) => trainer.name.toLowerCase().includes(this.search.toLowerCase()));
    console.log(this.coursesToShow);
  }
}
