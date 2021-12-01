import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-logout',
  templateUrl: './user-logout.component.html',
  styleUrls: ['./user-logout.component.css']
})
export class UserLogoutComponent implements OnInit
{

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void
  {
    this.userLogout();
  }

  userLogout()
  {
    this.authService.isLoggedIn = false;
    this.authService.removeCurrentUser();
    alert('You have been logged out.');
    this.router.navigate(['login']);
  }
}
