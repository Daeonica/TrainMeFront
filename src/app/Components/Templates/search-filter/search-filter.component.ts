import { Component, EventEmitter, Input, Output, SimpleChanges, NgModule } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CategoryService } from 'src/app/Services/category/category.service';
import { CourseService } from 'src/app/Services/course/course.service';
import { CryptoJsService } from 'src/app/Services/crypto-js/crypto-js.service';
import { PaginationInstance } from 'ngx-pagination';
import { url } from 'src/app/Services/proxy';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css']
})
export class SearchFilterComponent {
  nameOfComponent = 'Search Filter';
  cookie: any;
  registerError = false;
  openWindow = false;
  alert = '';
  messages = [];
  show = '';
  categories: any;
  courses: any;
  max_price: any;
  min_price: any;
  selectedCategories: any;
  loading: boolean = true;
  url: any;


  @Input() coursesToShow!: any;
  @Output() updateArrayCourseToShow = new EventEmitter<any>();

  constructor(private categoryService: CategoryService, private router: Router, private courseService: CourseService, private route: ActivatedRoute, private cookieService: CookieService, private CryptJsService: CryptoJsService) {
    this.cookie = this.cookieService.get("user");
    this.min_price = 1;
    this.max_price = 100;
    this.url = url;
    this.selectedCategories = [];
    this.getCategory();

  }

  ngOnChanges(){

  }

  updateCourseByCategory(category: any, evt: any) {
    this.loading = true;

    this.selectedCategories = [];
    for (let index = 0; index < this.categories.length; index++) {
      if (this.categories[index].selected) {
        this.selectedCategories.push(this.categories[index]);
      }
    }
    console.log(this.selectedCategories)
    this.getAllCourseByFilter();
  }

  updatePrice(input_type: any, evt: any) {
    if (input_type == 'range') {
      this.min_price = 0;
    }
    this.loading = true;
    this.getAllCourseByFilter();
  }

  getAllCourses(): any{
    this.courseService.courses().subscribe(response => {
      this.coursesToShow = response;
      this.courses = response;
      this.loading = false;
    },
      error => {

      })
  }



  getAllCourseByFilter() {
    this.coursesToShow = [];
    for (let i = 0; i < this.courses.length; i++) {
      if (this.selectedCategories.length == 0) {
        if ((Number(this.courses[i].price) <= Number(this.max_price)) && (Number(this.courses[i].price) >= Number(this.min_price))) {
          this.coursesToShow.push(this.courses[i])
        }
      } else {
        for (let j = 0; j < this.selectedCategories.length; j++) {
          if ((this.courses[i].category.id == this.selectedCategories[j].id) && (Number(this.courses[i].price) <= Number(this.max_price)) && (Number(this.courses[i].price) >= Number(this.min_price))) {
            this.coursesToShow.push(this.courses[i])
          }
        }
      }

    }
    this.loading = false;
    this.updateArrayCourseToShow.emit(this.coursesToShow);
  }



  config: PaginationInstance = {
    id: 'mi-paginacion',
    itemsPerPage: 10,
    currentPage: 1
  };

  ngOnInit() {
    if(this.route.snapshot.paramMap.get('query') != null){
      this.courseService.getCoursesByQuery(this.route.snapshot.paramMap.get('query')).subscribe(response => {
        this.coursesToShow = response;
        this.courses = response;
        this.loading = false;

      },
        error => {

        })
    }else{
      this.getAllCourses();
    }

  }

  getCategory() {
    this.categoryService.categories().subscribe(response => {
      for (let i = 0; i < response.length; i++) {
        response[i].selected = true;
      }
      this.categories = response;
    })
  }

}
