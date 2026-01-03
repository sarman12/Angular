import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private http:HttpClient) { }
  url="http://localhost:2500/userData";
  getAllUser() : Observable<any>{
    return this.http.get(this.url);
  }

  deleteUser(id:any):Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  addUser(data:any):Observable<any>{
    return this.http.post(this.url,data);
  }

  getUserByid(id:any):Observable<any>{
    return this.http.get(this.url+"/"+id);
  }

  getUserByEmail(email: string): Observable<any> {
    return this.http.get(`${this.url}?email=${email}`);
  }
  updateUser(id:any,data:any):Observable<any>{
    return this.http.put(`${this.url}/${id}`,data);
  }

}
