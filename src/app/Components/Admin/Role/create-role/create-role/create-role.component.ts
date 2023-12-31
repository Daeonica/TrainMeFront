import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/Models/Role';
import { RoleService } from 'src/app/Services/role/role.service';


@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent {
  role: any;
  createForm: any;
  openWindow = false;
  messages = [];
  show = '';
  alert = '';
  loading = false;

  constructor(private route: ActivatedRoute,  private router: Router, private roleService: RoleService) {


  }


  ngOnInit() {


    this.createForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      key_value: new FormControl('', [Validators.required ]),
    })

  }


  onCreate() {
    const data = this.createForm.value;
    let role = new Role(data.id, data.name, data.key_value);
    this.loading = true;
    this.roleService.create(role).subscribe(response => {
      if (response.code == '200') {
        this.alert = 'green';
        this.router.navigate(['/admin/role'])
      } else {
        this.alert = 'red';
      }
      this.messages = response.messages;
      console.log(this.messages);
      this.show = 'show';
      this.loading = false;
    }, error => {
      this.loading = false;
      console.log(error);
    })
  }

  closeAlert() {
    this.show = '';
    this.alert = '';
  }
}
