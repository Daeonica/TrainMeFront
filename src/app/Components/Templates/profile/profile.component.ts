import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ViewChild } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/User';
import { CookieService } from 'ngx-cookie-service';
import { Role } from 'src/app/Models/Role';
import { CryptoJsService } from 'src/app/Services/crypto-js/crypto-js.service';
import { UserService } from 'src/app/Services/user/user.service';
import { url } from 'src/app/Services/proxy';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: any;
  cookie: any;
  nameOfComponent = 'Mi cuenta';
  updateChanges = false;
  updateForm: any;
  openWindow = false;
  messages = [];
  updateError = false;
  show = '';
  alert = '';
  file: any;
  @Input() img = '';
  @Output() setImage = new EventEmitter<string>();
  loading = false;

  constructor(private userService: UserService, private router: Router, private cookieService: CookieService, private CryptJsService: CryptoJsService) {
    this.cookie = this.cookieService.get("user");

  }

  logout() {
    this.cookieService.delete('user');
    this.router.navigate(['/']);

  }

  ngOnInit() {
    if (this.cookie == '') {
      this.router.navigate(['/']);

    }
    this.user = this.CryptJsService.decrypt(this.cookie)
    this.img = url + 'user/image/' + this.user.id;

    this.updateForm = new FormGroup({
      name: new FormControl(this.user.name),
      surname: new FormControl(this.user.surname),
      email: new FormControl(this.user.email, [Validators.email]),
      password: new FormControl(''),
      confirmPassword: new FormControl('')
    })

  }


  onUpdate() {
    const data = this.updateForm.value;
    let user = new User(data.email, data.password, data.confirmPassword, this.user.id, data.name, data.surname, '', new Role('', '', ''));
    this.loading = true;
    console.log(data);
    this.userService.update(user).subscribe(response => {
      if (response.code == '200') {
        this.cookieService.set("user", this.CryptJsService.encrypt(response.user));
        this.user = response.user;
        this.alert = 'green';
        this.setImage.emit(url + 'user/image/' + this.user.id)
      } else {
        this.alert = 'red';
      }
      console.log(response);
      this.messages = response.messages;
      this.show = 'show';
      this.loading = false;

    }, error => {
      this.loading = false;

    })
  }

  onDelete() {
    this.userService.delete(this.user).subscribe(response => {
      if (response.code == '200') {
        this.cookieService.delete('user');
        this.cookie = '';
        this.router.navigate(['about']);
      } else {
      }
    });
  }

  catchFile(event: any) {
    this.file = event.target.files[0];
  }

  uploadFile() {
    console.log(this.file);
    this.loading = true;

    this.userService.uploadFile(this.file).subscribe(response => {
      if (response.code == 200) {
        this.alert = 'green';
        this.router.navigate(['/profile']);
      } else {
        this.alert = 'red';
      }
      this.show = 'show';
      this.messages = response.messages;
      this.loading = false;

    },
      error => {
        console.log(error)
        this.loading = false;
      })
  }

  downloadFile() {
    this.loading = true;
    this.userService.downloadFile().subscribe((blob: Blob) => {
      let url = window.URL.createObjectURL(blob);
      let a = document.createElement('a');
      a.href = url;
      a.download = 'profile'
      a.click();
      window.URL.revokeObjectURL(url);
      console.log(blob);
      this.loading = false;

    })
  }

  closeAlert() {
    this.show = '';
    this.alert = '';
  }

}
