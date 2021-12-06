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

  profilePics: string[] = [
    "../../assets/mike-stoklasa}-232863-normal.jpg",
    "../../assets/jay-bauman}-232864-normal.jpg",
    "../../assets/rich_evans_suit.jpg"
  ];

  constructor(private http: HttpClient) { }

  getAllUsersService(): Observable<User[]>
  {
    return this.http.get<User[]>(this.baseURL);
  }

  getUserService(user: User): Observable<User>
  {
    return this.http.get<User>(this.baseURL + "/" + user.userID);
  }

  getUserByIDService(userID: number): Observable<User>
  {
    return this.http.get<User>(this.baseURL + "/" + userID);
  }

  getUserIDService(username: string): Observable<number>
  {
    return this.http.get<number>(this.baseURL + "/id/" + username);
  }

  addUserService(user: User): Observable<User>
  {
    return this.http.post<User>(this.baseURL, user);
  }

  updateUserService(user: User): Observable<User>
  {
    return this.http.put<User>(this.baseURL + "/" + user.userID, user);
  }

  removeUserService(user: User): Observable<User>
  {
    return this.http.delete<User>(this.baseURL + "/r/" + user.userID);
  }

  userPasswordVerification(user: User): Observable<boolean>
  {
    return this.http.get<boolean>(this.baseURL + "/verify/" + user.userID)
  }
}
