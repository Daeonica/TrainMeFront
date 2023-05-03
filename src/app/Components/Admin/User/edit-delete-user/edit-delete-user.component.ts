import { style } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Role } from 'src/app/Models/Role';
import { User } from 'src/app/Models/User';
import { CryptoJsService } from 'src/app/Services/crypto-js/crypto-js.service';
import { RoleService } from 'src/app/Services/role/role.service';
import { UserService } from 'src/app/Services/user/user.service';

@Component({
  selector: 'app-edit-delete-user',
  templateUrl: './edit-delete-user.component.html',
  styleUrls: ['./edit-delete-user.component.css']
})
export class EditDeleteUserComponent {
  user: any;
  cookie: any;
  updateChanges = false;
  updateForm: any;
  openWindow = false;
  messages = [];
  updateError = false;
  show = '';
  alert = '';
  loading = false;

  constructor(private roleService: RoleService, private route: ActivatedRoute, private cookieService: CookieService, private userService: UserService, private router: Router, private CryptJsService: CryptoJsService) {
    this.updateForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      surname: new FormControl(),
      email: new FormControl('', [Validators.email]),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
      role: new FormControl(''),
    })
  }


  ngOnInit() {

    this.userService.getUserById(this.route.snapshot.paramMap.get('id')).subscribe(response => {
      this.user = response;
      console.log(this.user);
      this.updateForm = new FormGroup({
        id: new FormControl(this.route.snapshot.paramMap.get('id')),
        name: new FormControl(this.user.name, [Validators.required]),
        surname: new FormControl(this.user.surname,  [Validators.required]),
        email: new FormControl(this.user.email, [Validators.email]),
        role: new FormControl(this.user.role.id, [Validators.required])
      })

    }, error => {

    });


  }

  onDelete() {
    this.userService.delete(this.user).subscribe(response => {
      if (response.code == '200') {
        if (response.user.id == this.CryptJsService.decrypt(this.cookieService.get('user')).id) {
          this.router.navigate(['/register']);
        } else {
          this.router.navigate(['/admin/user']);
        }
      }
      console.log(response);
      this.messages = response.messages;
    }, error => {
      console.log(error)
    })
  }

  onUpdate() {
    const data = this.updateForm.value;
    this.loading = true;
    let user = new User(data.email, data.password, data.confirmPassword, data.id, data.name, data.surname, '', new Role(data.role, '', ''));
    this.userService.update(user).subscribe(response => {
      console.log(response);
      if (response.code == '200') {
        this.alert = 'green';
      } else {
        this.alert = 'red';
      }
      this.loading = false;

      this.messages = response.messages;
      this.show = 'show';
    }, error => {
      console.log(error);
      this.loading = false;

    })
  }

  closeAlert() {
    this.show = '';
    this.alert = '';
  }

}
