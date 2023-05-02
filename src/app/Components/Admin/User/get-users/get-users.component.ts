import { Component } from '@angular/core';
import { CryptoJsService } from 'src/app/Services/crypto-js/crypto-js.service';
import { UserService } from 'src/app/Services/user/user.service';

@Component({
  selector: 'app-get-users',
  templateUrl: './get-users.component.html',
  styleUrls: ['./get-users.component.css']
})
export class GetUsersComponent {
  users: any;
  loading: boolean = true;
  constructor(private userService: UserService, private cryptoJsService: CryptoJsService) {

  }

  ngOnInit() {
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
