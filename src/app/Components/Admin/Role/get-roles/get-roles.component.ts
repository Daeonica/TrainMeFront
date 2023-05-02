import { Component } from '@angular/core';
import { CryptoJsService } from 'src/app/Services/crypto-js/crypto-js.service';
import { RoleService } from 'src/app/Services/role/role.service';


@Component({
  selector: 'app-get-roles',
  templateUrl: './get-roles.component.html',
  styleUrls: ['./get-roles.component.css']
})
export class GetRolesComponent {
  roles: any;
  loading:boolean = true;
  constructor(private cryptoJsService: CryptoJsService, private roleService: RoleService) {

  }

  ngOnInit() {
    this.roleService.roles().subscribe(response => {
      console.log(response);
      this.roles = response;
      this.loading = false;
    },
      error => {
      this.loading = false;
      });
  }
}
