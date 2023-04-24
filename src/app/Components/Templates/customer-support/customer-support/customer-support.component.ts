import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Contact } from 'src/app/Models/Contact';
import { CustomerSupportService } from 'src/app/Services/customer-support/customer-support.service';

@Component({
  selector: 'app-customer-support',
  templateUrl: './customer-support.component.html',
  styleUrls: ['./customer-support.component.css']
})
export class CustomerSupportComponent {
  nameOfComponent = 'Customer Support';
  contactForm: any;

  constructor(private CustomerSupportService: CustomerSupportService) {}

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
    this.CustomerSupportService.sendForm(contact).subscribe(response => {
      console.log(response);
  });
  }
}
