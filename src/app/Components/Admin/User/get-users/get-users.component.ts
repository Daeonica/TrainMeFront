import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CryptoJsService } from 'src/app/Services/crypto-js/crypto-js.service';
import { UserService } from 'src/app/Services/user/user.service';

@Component({
  selector: 'app-get-users',
  templateUrl: './get-users.component.html',
  styleUrls: ['./get-users.component.css']
})
export class GetUsersComponent {
  users: any;
  loged_user: any;
  loading: boolean = true;
  constructor(private userService: UserService, private cryptoJsService: CryptoJsService, private cookieServie: CookieService) {

  }

  ngOnInit() {

    this.loged_user = this.cryptoJsService.decrypt(this.cookieServie.get('user'));
    console.log(this.loged_user);
    this.userService.allUsers().subscribe(response => {
      this.users = response;
      this.loading = false;
    },
      error => {
        console.log(error);
        this.loading = false;
      });
  }
}
