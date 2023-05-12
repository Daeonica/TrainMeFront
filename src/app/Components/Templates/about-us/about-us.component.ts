import { Component } from '@angular/core';
import { UserService } from 'src/app/Services/user/user.service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Contact } from 'src/app/Models/Contact';
import { CustomerSupportService } from 'src/app/Services/customer-support/customer-support.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent {

  constructor(private CustomerSupportService: CustomerSupportService) {}
  contactForm: any;
  messages: any;
  show: any;
  alert:any;

  ngOnInit(){
    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', [Validators.required])
    })
  }

  onSubmit(){
    const data = this.contactForm.value;
    let contact = new Contact(data.email,data.name,data.message);
    console.log(contact);
    this.CustomerSupportService.sendForm(contact).subscribe(response => {
      if (response.code == '200') {
        this.alert = 'green';    
      }else{
        this.alert = 'red';
      }
      this.messages = response.messages;
      console.log(this.messages);
      this.show ='show';
  });
  }

  closeAlert() {
    this.show = '';
    this.alert = '';
  }
}

