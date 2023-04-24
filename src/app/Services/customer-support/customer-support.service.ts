import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { url } from '../proxy';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerSupportService {

  constructor(private http: HttpClient) { }

  sendForm(contacto : any):Observable<any> {
    let header = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    let body = 'data='+JSON.stringify(contacto);
    return this.http.post(url+'contact', body, {headers: header});
  }
}
