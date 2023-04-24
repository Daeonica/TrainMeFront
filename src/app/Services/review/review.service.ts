import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from '../proxy';


@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor(private http: HttpClient) { }

  reviews(id: any): Observable<any> {
    return this.http.get(url+'course/reviews/' + id);
  }

  create(user_id:any, course_id: any, review: any): Observable<any> {
    let header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let body = 'data=' + JSON.stringify(review);
    return this.http.post(url+'course/create/review/'+user_id+'/'+course_id, body, { headers: header })
  }

  delete(course_id: any): Observable<any> {
    return this.http.delete(url+'course/review/delete/'+course_id)
  }
}
