import { Component } from '@angular/core';
import { UserService } from 'src/app/Services/user/user.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {
  nameOfComponent = 'About Us';
  creators: any;

  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.userService.creators().subscribe(response => {
      if (response) {
        this.creators = response;
        console.log(this.creators);
      }

    }, error => {
      console.log(error);
    })
  }
}

