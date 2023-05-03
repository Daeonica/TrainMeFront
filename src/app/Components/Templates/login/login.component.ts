import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../Services/user/user.service';
import { Router } from '@angular/router';
import { User } from '../../../Models/User';
import { Role } from 'src/app/Models/Role';
import { CryptoJsService } from 'src/app/Services/crypto-js/crypto-js.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  nameOfComponent = 'LogIn';
  loginForm: any;
  show = '';
  alert = '';
  messages = [];
  loading = false;


  constructor(private userService: UserService, private router: Router, private cookieService: CookieService, private CryptoJsService: CryptoJsService) {
    this.cookieService.delete('user');
  }


  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    })
  }

  onSubmit() {
    this.loading = true;

    const data = this.loginForm.value;
    let user = new User(data.email, data.password, '', 1, 1, 1, '', new Role('', '', ''));
    this.userService.login(user).subscribe(response => {
      if (response.code == '200') {
        document.cookie = 'user=' + this.CryptoJsService.encrypt(response.user);
        this.alert = 'green';
        this.router.navigate(['profile']);
      }else{
        this.alert = 'red';
      }
      console.log(response.messages);
      this.messages = response.messages;
      this.show = 'show';
      this.loading = false;

    }, error => {
      this.loading = false;
    })
  }

  closeAlert(){
    this.show = '';
    this.alert = '';
  }

}
