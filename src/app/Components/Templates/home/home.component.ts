import { Component } from '@angular/core';
import { CategoryService } from 'src/app/Services/category/category.service';
import { url } from 'src/app/Services/proxy';
import { UserService } from 'src/app/Services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  categories: any;
  trainers: any;
  category_url: any;
  trainer_url: any;
  url: any

  constructor(private categoryService: CategoryService, private userService: UserService) {
    this.category_url =   url+'category/image/'
    this.trainer_url =   url+'user/image/'
    this.url = url
  }


  ngOnInit(): void {
    this.getCategories();
    this.getTrainers();
  }

  getCategories() {
    this.categoryService.categories().subscribe((data: any) => {
      let categories = []
      for (let i = 0; i < data.length; i++) {
        if (i == 6) {
          break
        }
        categories.push(data[i])
      }
      this.categories = categories;
    }
    )
  }

  getTrainers() {
    this.userService.trainers().subscribe((data: any) => {
      let trainers = []
      for (let i = 0; i < data.length; i++) {
        if (i == 6) {
          break
        }
        trainers.push(data[i])
      }
      this.trainers = trainers;
    }
    )
  }

}
