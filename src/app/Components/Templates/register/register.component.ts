import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../Services/user/user.service';
import { Router } from '@angular/router';
import { User } from '../../../Models/User';
import { RoleService } from 'src/app/Services/role/role.service';
import { Role } from 'src/app/Models/Role';
import { CryptoJsService } from 'src/app/Services/crypto-js/crypto-js.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  nameOfComponent = 'Register';
  registerError =false;
  openWindow = false;
  alert = '';
  messages = [];
  show = '';
  roles:any;
  registerForm: any;


  constructor(private userService: UserService, private cookieService: CookieService, private router: Router, private roleService: RoleService, private CryptoJsService: CryptoJsService) {
    this.cookieService.delete('user');
  }


  getRoles(){
    this.roleService.roles().subscribe(response=>{
      let roles = [];
      for (let index = 0; index < response.length; index++) {
        if (response[index].key_value != 'admin' ) {
          roles.push(response[index]);
        }
      }
      this.roles = roles;
    });
  }


  ngOnInit() {
    this.getRoles();
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      surname:new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required])
    })
  }

  onRegister() {
    const data = this.registerForm.value;
    console.log(data);
    let role = new Role(data.role, '', '');
    let user = new User(data.email, data.password, data.confirmPassword,0, data.name,data.surname, '',role);
    this.userService.register(user).subscribe(response => { //register, funcion con la que enviamos los datos a synfony -- response nos devuelve un json response con distintos indices.
      //los distintos indices del response se accede mediante el .
      if (response.code == '200') {
        console.log(response);
        document.cookie = 'user=' + this.CryptoJsService.encrypt(response.user);
        this.router.navigate(['profile']);
        this.alert = 'success';
      }else{
        this.alert = 'warning';
      }
      this.messages= response.messages;
      this.show = 'show';
    }, error => {
      console.log(error);

    })
  }


  closeAlert(){
    this.show = '';
    this.alert = '';
  }

}



