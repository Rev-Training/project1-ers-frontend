import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{

  isLoggedIn: boolean = false;

  cacheUser(user: User)
  {
    sessionStorage.setItem("userCache", JSON.stringify(user));
  }

  getCurrentUser(): User
  {
    let data: any = sessionStorage.getItem("userCache");
    return JSON.parse(data == null ? new User() : data);
  }

  removeCurrentUser()
  {
    sessionStorage.removeItem("userCache");
  }

  userIsManager(): boolean
  {
    let data: any = sessionStorage.getItem("userCache");
    let user: User = JSON.parse(data);
    return data == null ? false : user.userIsManager;
  }

  constructor() { }
}
