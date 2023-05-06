import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/Services/category/category.service';
import { CourseService } from 'src/app/Services/course/course.service';
import { url } from 'src/app/Services/proxy';

@Component({
  selector: 'app-category-profile',
  templateUrl: './category-profile.component.html',
  styleUrls: ['./category-profile.component.css']
})
export class CategoryProfileComponent {
  category: any;
  courses: any;
  url = url;
  id: any;
  loading = true;

  constructor(private categoryService: CategoryService, private courseService:CourseService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getCategory();
    this.getCategoryCourses();
  }

  getCategory() {
    this.categoryService.getCategoryById(this.id).subscribe((res: any) => {
      this.category = res;
    })
  }

  getCategoryCourses() {
    this.courseService.coursesByCategory(this.id).subscribe((res: any) => {
      this.courses = res;
      this.loading = false;
    })
  }
}
