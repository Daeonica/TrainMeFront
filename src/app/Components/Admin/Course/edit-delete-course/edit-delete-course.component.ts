import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { response } from 'express';
import { Category } from 'src/app/Models/Category';
import { Course } from 'src/app/Models/Course';
import { Role } from 'src/app/Models/Role';
import { User } from 'src/app/Models/User';
import { CategoryService } from 'src/app/Services/category/category.service';
import { CourseService } from 'src/app/Services/course/course.service';
import { UserService } from 'src/app/Services/user/user.service';

@Component({
  selector: 'app-edit-delete-course',
  templateUrl: './edit-delete-course.component.html',
  styleUrls: ['./edit-delete-course.component.css']
})
export class EditDeleteCourseComponent {
  course: any;
  categories: any;
  cookie: any;
  updateChanges = false;
  updateForm: any;
  openWindow = false;
  messages = [];
  updateError = false;
  show = '';
  alert = '';
  fileImage: any;
  fileDocument: any;
  fileVideo: any;
  img: any;

  constructor(private userService: UserService, private courseService: CourseService, private route: ActivatedRoute, private router: Router, private categoryService: CategoryService) {
    this.categoryService.categories().subscribe(response => {
      this.categories = response;
    });

    this.updateForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      description: new FormControl(),
      price: new FormControl(),
      user: new FormControl(),
      category: new FormControl(),
    })
  }


  ngOnInit() {
    this.courseService.getCourseById(this.route.snapshot.paramMap.get('id')).subscribe(response => {
      this.course = response;
      this.updateForm = new FormGroup({
        id: new FormControl(this.route.snapshot.paramMap.get('id')),
        name: new FormControl(this.course.name),
        description: new FormControl(this.course.description),
        price: new FormControl(this.course.price),
        user: new FormControl(this.course.user.name),
        category: new FormControl(this.course.category.id),
      })


      console.log(response);

    }, error => {
      console.log(error);

    });


  }

  onDelete() {
    this.courseService.delete(this.course).subscribe(response => {
      if (response.code == '200') {
        this.router.navigate(['profile']);
      } else {
      }
    });
  }







  onUpdate() {
    const data = this.updateForm.value;
    let user = new User('', '', '', data.user, '', '', '', new Role('', '', ''));
    let category = new Category(data.category, '', '');
    let course = new Course(data.id, data.name, data.description, data.price, '', '', user, category);
    this.courseService.update(course).subscribe(response => {
      if (response.code == '200') {
        this.alert = 'success';
      } else {
        this.alert = 'warning';
      }

      this.messages = response.messages;
      this.show = 'show';
    }, error => {
      console.log(error);
    })
  }

  closeAlert() {
    this.show = '';
    this.alert = '';
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

  uploadImage() {
    console.log(this.fileImage);
    this.courseService.uploadImage(this.fileImage, this.course.id).subscribe(response => {
      if (response.code == 200) {
        this.alert = 'success';
      }else{
        this.alert = 'warning';
      }
      this.show = 'show';
      this.messages = response.messages;
    },
      error => {
        console.log(error)
      })
  }

  uploadVideo() {
    this.courseService.uploadVideo(this.fileVideo, this.course.id).subscribe(response => {
      if (response.code == 200) {
        this.alert = 'success';
        // this.router.navigate(['/profile']);
      }else{
        this.alert = 'warning';
      }
      this.show = 'show';
      this.messages = response.messages;
      console.log(response);
    },
      error => {
        console.log(error)
      })
  }

  uploadFile() {
    console.log(this.fileDocument);
    this.courseService.uploadFile(this.fileDocument, this.course.id).subscribe(response => {
      if (response.code == 200) {
        this.alert = 'success';
      }else{
        this.alert = 'warning';
      }
      this.show = 'show';
      this.messages = response.messages;
    },
      error => {
        console.log(error)
      })
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
