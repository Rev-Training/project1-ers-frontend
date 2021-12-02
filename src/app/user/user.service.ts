import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService
{

  baseURL = "http://localhost:8888/api/users";

  constructor(private http: HttpClient) { }

  getAllUsersService(): Observable<User[]>
  {
    return this.http.get<User[]>(this.baseURL);
  }

  getUserService(user: User): Observable<User>
  {
    return this.http.get<User>(this.baseURL + "/" + user.userID);
  }

  getUserIDService(username: string): Observable<number>
  {
    return this.http.get<number>(this.baseURL + "/id/" + username);
  }

  addUserService(user: User): Observable<User>
  {
    return this.http.get<User>(this.baseURL + "/" + user.userID);
  }

  updateUserService(user: User): Observable<User>
  {
    return this.http.put<User>(this.baseURL + "/" + user.userID, user);
  }

  removeUserService(user: User): Observable<User>
  {
    return this.http.delete<User>(this.baseURL + "/" + user.userID);
  }

}
