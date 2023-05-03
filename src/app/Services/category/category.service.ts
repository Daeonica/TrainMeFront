import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from '../proxy';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }



  getCategoryById(id: any) {
    let header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.get(url+'category/get-by-id/' + id, { headers: header })
  }

  update(user:any):Observable<any>{
    let header = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    let body = 'data='+JSON.stringify(user);
    return this.http.put(url+'category/update', body, {headers: header})
  }


  categories(): Observable<any> {
    return this.http.get(url+'category/get');
  }

  delete(category: any): Observable<any> {
    let header = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    let body = 'data='+JSON.stringify(category);
    return this.http.delete(url+'category/delete', {headers: header, body: body})
  }

  create(category: any): Observable<any> {
    let header = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    let body = 'data='+JSON.stringify(category);
    return this.http.post(url+'category/add', body, {headers: header})
  }

  uploadFile(file: any, id:any): Observable<any>{
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(url+'category/upload/image/'+id, formData)
  }

  downloadFile(id:any): Observable<any>{
    return this.http.get(url+'category/image/'+id,{responseType: 'blob'})
  }
}
