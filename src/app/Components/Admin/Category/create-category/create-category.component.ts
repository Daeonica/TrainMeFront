import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/Models/Category';
import { CategoryService } from 'src/app/Services/category/category.service';


@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent {
  category: any;
  createForm: any;
  openWindow = false;
  messages = [];
  show = '';
  alert = '';

  constructor(private route: ActivatedRoute,  private router: Router, private categoryService: CategoryService) {


  }


  ngOnInit() {


    this.createForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required ]),
      description: new FormControl('', [Validators.required ]),
    })

  }

  onDelete(){

  }

  onCreate() {
    const data = this.createForm.value;
    let category = new Category(data.id, data.name, data.description);
    this.categoryService.create(category).subscribe(response => {
      if (response.code == '200') {
        this.alert = 'success';
        this.router.navigate(['/admin/category'])
      } else {
        this.alert = 'warning';
      }
      this.messages = response.messages;
      console.log(this.messages);
      this.show = 'show';
    }, error => {
      console.log(error);
    })
  }

  closeAlert() {
    this.show = '';
    this.alert = '';
  }
}
