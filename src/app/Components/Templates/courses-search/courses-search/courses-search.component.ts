import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CategoryService } from 'src/app/Services/category/category.service';
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
  @Input() coursesToShow: any;
  @Output() coursesToShowChange: any;
  url = url;
  search: any;
  loading = true;
  isModalOpen = false;
  min_price: any = 0;
  max_price: any;
  categories: any;
  selectedCategories: any;

  updateCourseByCategory(category: any, evt: any) {
    this.loading = true;

    this.selectedCategories = [];
    for (let index = 0; index < this.categories.length; index++) {
      if (this.categories[index].selected) {
        this.selectedCategories.push(this.categories[index]);
      }
    }
    this.updateQuery();
  }


  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
  constructor(private courseService: CourseService, private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.courseService.courses().subscribe((res: any) => {
      this.all_courses = res;
      this.coursesToShow = res;
      this.loading = false;
    }
    );
    this.getCategories();
  }

  updateQuery(){
    if (this.search != null) {

    }else{
      let coursesByName = this.all_courses.filter((trainer: any) => trainer.name.toLowerCase().includes(this.search.toLowerCase()));
      let coursesByNameAndPrice = coursesByName.filter((course: any) => course.price >= this.min_price  && course.price <= this.max_price);
      let coursesByNameAndPriceAndCategory = 

    }
  }

  query() {
    this.coursesToShow = this.all_courses.filter((trainer: any) => trainer.name.toLowerCase().includes(this.search.toLowerCase()));
  }

  getCategories() {
    this.categoryService.categories().subscribe((res: any) => {
      this.categories = res;
    }
    );
  }
}
