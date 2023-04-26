import { Component, Input } from '@angular/core';
import { CategoryService } from 'src/app/Services/category/category.service';
import { url } from 'src/app/Services/proxy';

@Component({
  selector: 'app-categories-search',
  templateUrl: './categories-search.component.html',
  styleUrls: ['./categories-search.component.css']
})
export class CategoriesSearchComponent {
  all_categories: any;
  categoriesToShow: any;
  url = url;
  search: any;
  loading = true;

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.categoryService.categories().subscribe((res: any) => {
      this.all_categories = res;
      this.categoriesToShow = res;
      this.loading = false;
    }
    );
  }

  query(){
    this.categoriesToShow = this.all_categories.filter((trainer: any) => trainer.name.toLowerCase().includes(this.search.toLowerCase()));
    console.log(this.categoriesToShow);
  }
}
