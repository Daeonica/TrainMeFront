import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Course } from 'src/app/Models/Course';
import { CookieService } from 'ngx-cookie-service';
import { CategoryService } from 'src/app/Services/category/category.service';
import { CourseService } from 'src/app/Services/course/course.service';
import { CryptoJsService } from 'src/app/Services/crypto-js/crypto-js.service';
import { Category } from 'src/app/Models/Category';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent {
  componentName = 'Crea tu curso';
  formCreateCourse: any;
  categories: any;
  show: any;
  alert: any;
  messages = [];
  cookie: any;
  user: any;

  constructor(private courseService: CourseService, private router: Router, private categoryService: CategoryService, private CryptoJsService: CryptoJsService, private cookieService: CookieService) {
    this.cookie = this.cookieService.get("user");
    this.user = this.CryptoJsService.decrypt(this.cookie)
    this.getCategories();
  }


  getCategories() {
    this.categoryService.categories().subscribe(response => {
      this.categories = response;
    });
  }

  ngOnInit() {

    this.formCreateCourse = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      documentRoot: new FormControl('', [Validators.required]),
      imgPath: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required])
    })
  }

  createCourse() {
    const data = this.formCreateCourse.value;

    let course = new Course('', data.name, data.description, data.price, '', '', this.user, new Category(data.category, '', ''));
    this.courseService.create(course).subscribe(response => {
      console.log(response);

      if (response.code == '200') {
        this.router.navigate(['profile']);
        this.alert = 'success';
      } else {
        this.alert = 'warning';
      }
      this.messages = response.messages;
      this.show = 'show';
    }, error => {
      console.log(error);
    });
  }

}
