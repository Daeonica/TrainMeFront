import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CategoryService } from 'src/app/Services/category/category.service';
import { CryptoJsService } from 'src/app/Services/crypto-js/crypto-js.service';
import { UserService } from 'src/app/Services/user/user.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  user: any;
  query: string = '';
  constructor(private CookieService: CookieService, private CryptoJsService: CryptoJsService, private route: Router) {
  }


  ngDoCheck() {
    let cookie = this.CookieService.get('user');
    if (cookie != '') {
      this.user = this.CryptoJsService.decrypt(cookie);
    } else {
      this.user = null;
    }
  }

  searchButton() {
    console.log(this.query)
    this.route.navigateByUrl("/courses/search/" + this.query).then(() => {

      window.location.reload();
    });
  }

  logOut() {

    this.CookieService.delete('user');
    this.route.navigate(['login']);
  }
}
