import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { url } from '../proxy';
import { CryptoJsService } from '../crypto-js/crypto-js.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private cookieService: CookieService, private cryptoJsService: CryptoJsService) {
  }

  getUserById(id: any){
    let header = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    return this.http.get(url+'user/get-by-id/'+id, {headers: header})
  }


  delete(user: any): Observable<any> {
    let header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let body = 'data=' + JSON.stringify(user);
    return this.http.delete(url+'user/delete',{ headers: header, body: body })
  }

  login(user: any): Observable<any> {
    let header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let body = 'data=' + JSON.stringify(user);
    return this.http.post(url+'user/login', body, { headers: header })
  }

  register(user: any): Observable<any> {
    let header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let body = 'data=' + JSON.stringify(user);
    return this.http.post(url+'user/register', body, { headers: header })
  }

  update(user: any): Observable<any> {
    let header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let body = 'data=' + JSON.stringify(user);
    return this.http.put(url+'user/update', body, { headers: header })
  }

  creators(): Observable<any> {
    let header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.get(url+'about_us', { headers: header })
  }

  allUsers(): Observable<any> {
    let header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.get(url+'user/all-users', { headers: header })
  }

  uploadFile(file: any): Observable<any>{
    let user = this.cryptoJsService.decrypt(this.cookieService.get("user"));
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(url+'user/upload/'+user.id, formData)
  }

  downloadFile(): Observable<any>{
    let user = this.cryptoJsService.decrypt(this.cookieService.get("user"));
    return this.http.get(url+'user/image/'+user.id,{responseType: 'blob'})
  }

  trainers(): Observable<any> {
    let header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.get(url+'getTrainers', { headers: header })
  }



}
