import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'src/app/Models/Course';
import { url } from '../proxy';



@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  getCourseById(id: any) {
    let header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(url+'course/get-by-id/' + id, { headers: header })
  }

  update(user: any): Observable<any> {
    let header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let body = 'data=' + JSON.stringify(user);
    return this.http.put(url+'course/update', body, { headers: header })
  }

  create(course: any): Observable<any> {
    let header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let body = 'data=' + JSON.stringify(course);
    console.log(course);
    return this.http.post(url+'course/create', body, { headers: header })
  }

  courses(): Observable<any> {
    return this.http.get(url+'course/get');
  }

  trainerCourses(id: any): Observable<any> {
    return this.http.get(url+'course/trainer/' + id);
  }

  delete(course: any): Observable<any> {
    let header = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    let body = 'data='+JSON.stringify(course);
    return this.http.delete(url+'course/delete', {headers: header, body: body})
  }

  uploadFile(file: any, id: any): Observable<any>{
    const formData = new FormData();
    formData.append('file', file, file.name);
    console.log(formData);
    return this.http.post(url+'course/upload/document/'+id, formData)
  }

  coursesByCategory(id: any): Observable<any>{
    return this.http.get(url+'course/category/'+id)
  }

  uploadImage(file: any, id: any): Observable<any>{
    const formData = new FormData();
    formData.append('file', file, file.name);
    console.log(formData, id);
    return this.http.post(url+'course/upload/image/'+id, formData)
  }

  uploadVideo(file: any, id: any): Observable<any>{
    const formData = new FormData();
    formData.append('file', file, file.name);
    console.log(formData.get('file'), id);
    return this.http.post(url+'course/upload/video/'+id, formData)
  }

  downloadFile(id: any): Observable<any>{
    return this.http.get(url+'course/document/'+id,{responseType: 'blob'})
  }

  getCoursesByQuery(query: any): Observable<any>{
    return this.http.get(url+'course/search/'+query)
  }
  isPurchased(user_id: any, course_id:any): Observable<any>{
    let header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.get(url+'is-purchased/'+user_id+'/'+course_id,{ headers: header })
  }

  purchaseCourse(user_id: any, course_id:any): Observable<any>{
    let header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(url+'buy/'+user_id+'/'+course_id,{ headers: header })
  }

  getPurchasedCourses(user_id: any): Observable<any>{
    let header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.get(url+'purchased-courses/'+user_id, { headers: header })
  }

  categoryCoursesCount(id: any): Observable<any>{
    return this.http.get(url+'count/category-courses/'+id)
  }

  trainerCoursesCount(id: any): Observable<any>{
    return this.http.get(url+'count/category-courses/'+id)
  }
}
