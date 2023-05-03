import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/Models/Category';
import { CategoryService } from 'src/app/Services/category/category.service';



@Component({
  selector: 'app-edit-delete-category',
  templateUrl: './edit-delete-category.component.html',
  styleUrls: ['./edit-delete-category.component.css']
})
export class EditDeleteCategoryComponent {
  category: any;
  cookie: any;
  updateChanges = false;
  updateForm: any;
  openWindow = false;
  messages = [];
  updateError = false;
  show = '';
  alert = '';
  loading = false;
  file: any;

  constructor(private route: ActivatedRoute, private router: Router, private categoryService: CategoryService) {

    this.updateForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      description: new FormControl(),
    })
  }


  ngOnInit() {




    this.categoryService.getCategoryById(this.route.snapshot.paramMap.get('id')).subscribe(response => {
      this.category = response;
      this.updateForm = new FormGroup({
        id: new FormControl(this.route.snapshot.paramMap.get('id')),
        name: new FormControl(this.category.name),
        description: new FormControl(this.category.description),
      })

    }, error => {

    });


  }

  onDelete() {
    this.categoryService.delete(this.category).subscribe(response => {
      if (response.code == '200') {
        this.router.navigate(['/admin/category']);
      }
      this.messages = response.messages
    }, error => {
      console.log(error)
    })
  }

  onUpdate() {
    this.loading = true;
    const data = this.updateForm.value;
    let category = new Category(data.id, data.name, data.description);
    this.categoryService.update(category).subscribe(response => {
      if (response.code == '200') {
        this.alert = 'green';
      } else {
        this.alert = 'red';
      }

      this.messages = response.messages;
      this.loading = false;
      this.show = 'show';
    }, error => {
      this.loading = false;
      console.log(error);
    })
  }

  closeAlert() {
    this.show = '';
    this.alert = '';
  }

  catchFile(event: any) {
    this.file = event.target.files[0];
  }

  uploadFile() {
    console.log(this.file);
    this.loading = true;

    this.categoryService.uploadFile(this.file, this.category.id).subscribe(response => {
      if (response.code == 200) {
        this.alert = 'green';
      } else {
        this.alert = 'red';
      }
      this.show = 'show';
      this.messages = response.messages;
      this.loading = false;

    },
      error => {
        console.log(error)
        this.loading = false;
      })
  }

}
