import { Component } from '@angular/core';
import { CryptoJsService } from 'src/app/Services/crypto-js/crypto-js.service';
import { CategoryService } from 'src/app/Services/category/category.service';

@Component({
  selector: 'app-get-categories',
  templateUrl: './get-categories.component.html',
  styleUrls: ['./get-categories.component.css']
})
export class GetCategoriesComponent {
  categories: any;
  loading:boolean = true;
  constructor(private cryptoJsService: CryptoJsService, private categoryService: CategoryService) {
    
  }

  ngOnInit() {
    this.categoryService.categories().subscribe(response => {
      console.log(response);
      this.categories = response;
      this.loading = false;
    },
      error => {
      this.loading = false;
      });
  }
}
