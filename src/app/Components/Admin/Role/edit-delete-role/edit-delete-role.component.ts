import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/Models/Role';
import { RoleService } from 'src/app/Services/role/role.service';


@Component({
  selector: 'app-edit-delete-role',
  templateUrl: './edit-delete-role.component.html',
  styleUrls: ['./edit-delete-role.component.css']
})
export class EditDeleteRoleComponent {
  role: any;
  cookie: any;
  updateChanges = false;
  updateForm: any;
  openWindow = false;
  messages = [];
  updateError = false;
  show = '';
  alert = '';

  constructor(private route: ActivatedRoute, private router: Router, private roleService: RoleService) {

    this.updateForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      key_value: new FormControl(),
    })
  }


  ngOnInit() {




    this.roleService.getRoleById(this.route.snapshot.paramMap.get('id')).subscribe(response => {
      this.role = response;
      this.updateForm = new FormGroup({
        id: new FormControl(this.route.snapshot.paramMap.get('id')),
        name: new FormControl(this.role.name),
        key_value: new FormControl(this.role.key_value),
      })

    }, error => {

    });


  }

  onDelete() {
    this.roleService.delete(this.role).subscribe(response => {
      if (response.code == '200') {
        this.router.navigate(['/admin/role']);
      }
      console.log(response);
      this.messages = response.messages;
    }, error => {
      console.log(error)
    })
  }

  onUpdate() {
    const data = this.updateForm.value;
    let role = new Role(data.id, data.name, data.key_value);
    this.roleService.update(role).subscribe(response => {
      if (response.code == '200') {
        this.alert = 'success';
      } else {
        this.alert = 'warning';
      }

      this.messages = response.messages;
      this.show = 'show';
    }, error => {
      console.log(error);
    })
  }

  closeAlert() {
    this.show = '';
    this.alert = '';
  }
}
