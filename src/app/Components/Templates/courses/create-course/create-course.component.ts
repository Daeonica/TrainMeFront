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
  messages = [];
  cookie: any;
  user: any;
  fileImage: any;
  fileDocument: any;
  fileVideo: any;

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
      price: new FormControl('', [Validators.required, Validators.max(100)]),
      category: new FormControl('', [Validators.required]),
    })
  }

  createCourse() {
    const data = this.formCreateCourse.value;
    console.log(data);
    let course = new Course('', data.name, data.description, data.price, data.document, data.image, this.user, new Category(data.category, '', ''), data.video);
    this.courseService.create(course).subscribe(response => {
      console.log(response);

      if (response.code == '200') {
        // this.router.navigate(['profile']);
        if (this.fileDocument != null) {
          this.courseService.uploadFile(this.fileDocument, response.course.id).subscribe(response => {
            console.log(response);
          }, error => {
            console.log(error);
          });
        }

        if (this.fileImage != null) {
          this.courseService.uploadImage(this.fileImage, response.course.id).subscribe(response => {
            console.log(response);
          }, error => {
            console.log(error);
          });
        }

        if (this.fileVideo != null) {
          this.courseService.uploadVideo(this.fileVideo, response.course.id).subscribe(response => {
            console.log(response);
          }, error => {
            console.log(error);
          });
        }
        
      } else {
      }
      this.messages = response.messages;
    }, error => {
      console.log(error);
    });
  }

  catchFile(event: any) {
    this.fileDocument = event.target.files[0];
  }

  catchImage(event: any) {
    this.fileImage = event.target.files[0];
  }

  catchVideo(event: any) {
    this.fileVideo = event.target.files[0];
  }

}
