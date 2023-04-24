import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from '../proxy';



@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }


  roles():Observable<any>{
    return this.http.get<any>(url+'roles/get')
  }

  getRoleById(id:any):Observable<any>{
    let header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.get(url+'role/get-by-id/' + id, { headers: header })
  }

  update(role:any):Observable<any>{
    let header = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    let body = 'data='+JSON.stringify(role);
    return this.http.put(url+'role/update', body, {headers: header})
  }

  create(role: any): Observable<any> {
    let header = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    let body = 'data='+JSON.stringify(role);
    return this.http.post(url+'role/add', body, {headers: header})
  }

  delete(role: any): Observable<any> {
    let header = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    let body = 'data='+JSON.stringify(role);
    return this.http.delete(url+'role/delete', {headers: header, body: body})
  }

}
