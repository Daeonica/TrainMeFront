import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { response } from 'express';
import { CookieService } from 'ngx-cookie-service';
import { Category } from 'src/app/Models/Category';
import { Course } from 'src/app/Models/Course';
import { Role } from 'src/app/Models/Role';
import { User } from 'src/app/Models/User';
import { CategoryService } from 'src/app/Services/category/category.service';
import { CourseService } from 'src/app/Services/course/course.service';
import { CryptoJsService } from 'src/app/Services/crypto-js/crypto-js.service';
import { ReviewService } from 'src/app/Services/review/review.service';
import { UserService } from 'src/app/Services/user/user.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { core } from '@angular/compiler';
import { url } from 'src/app/Services/proxy';




@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  nameOfComponent = 'Course';
  course: any;
  cookie: any;
  messages = [];
  show = '';
  alert = '';
  user: any;
  reviews: any;
  commentForm: any;
  loading: boolean = true;
  url = url
  category_courses:any = [];

  @Input() purchased!: any;
  @Output() setPurchase = new EventEmitter<any>();

  constructor(private reviewService: ReviewService, private userService: UserService, private courseService: CourseService, private route: ActivatedRoute, private router: Router, private categoryService: CategoryService, private cryptJSService: CryptoJsService, private cookieService: CookieService) {
    this.purchased = false;
    this.loading = true;
    //cogemos el user a partir del cookie service
    //this.user = this.cryptJSService.decrypt(this.cookieService.get('user'));
    if (this.cookieService.get('user') != '') {
      this.user = this.cryptJSService.decrypt(this.cookieService.get('user'));

    }

    this.commentForm = new FormGroup({
      comment: new FormControl()
    })


  }

  ngOnInit() {
    this.loading = true;

    //con esto nos devuelve el objeto curso con el id que le pasamos por query -> tambien podemos coger el profesional
    this.courseService.getCourseById(this.route.snapshot.paramMap.get('id')).subscribe(response => {
      this.course = response;
      console.log(this.course);
      //para acceder al professinoal {{course.user.name}}
      if (this.user != null) {
        //pasamos por parametro el id del user y el id del curso. Si coinciden, la respuesta sera un true
        this.courseService.isPurchased(this.user.id, this.route.snapshot.paramMap.get('id')).subscribe(response => {
          this.purchased = response;
        });
      } else {
        this.purchased = false;
      }
      this.setPurchase.emit(this.purchased);

      this.loading = false;
      this.getCategoryCourses();

    }, error => {
      console.log(error);

    });

    this.courseReviews();
  }

  courseReviews() {

    this.loading = true;
    this.reviewService.reviews(this.route.snapshot.paramMap.get('id')).subscribe(response => {
      this.reviews = response;
      this.loading = false;
      console.log(this.reviews);
    },
      error => {

      })
  }

  buy() {
    this.loading = true;

    this.courseService.purchaseCourse(this.user.id, this.route.snapshot.paramMap.get('id')).subscribe(response => {
      this.loading = false;

      if (response.code == '200') {
        this.purchased = true;
        this.alert = 'success';
      } else {
        this.purchased = false;
        this.alert = 'warning'
      }
      this.setPurchase.emit(this.purchased);
      this.messages = response.messages;
      this.show = 'show';

    });
  }

  getCategoryCourses() {
    this.courseService.coursesByCategory(this.course.id).subscribe((res: any) => {
      this.category_courses = res;
    })
  }

  deleteReview(reviewId: any) {

    this.loading = true;

    this.reviewService.delete(reviewId).subscribe(response => {
      if (response.code == '200') {
        this.alert = 'success';
        this.courseReviews();
      } else {
        this.alert = 'warning'
      }
      this.loading = false;
      this.show = 'show';
      this.messages = response.messages;
    })
  }

  createReview() {
    let comment = this.commentForm.value;
    this.loading = true;
    this.reviewService.create(this.user.id, this.course.id, comment).subscribe(response => {
      if (response.code == 200) {
        this.alert = 'success';
        this.courseReviews();
        this.commentForm.reset();
      } else {
        this.alert = 'warning'
      }
      this.loading = false;


      this.show = 'show';
      this.messages = response.messages;
    })
  }

  closeAlert() {
    this.show = '';
    this.alert = '';
  }

  downloadFile() {
    this.courseService.downloadFile(this.course.id).subscribe((blob: Blob) => {
      let url = window.URL.createObjectURL(blob);
      let a = document.createElement('a');
      a.href = url;
      a.download = this.course.name
      a.click();
      window.URL.revokeObjectURL(url);
      console.log(blob);
    })
  }
}
