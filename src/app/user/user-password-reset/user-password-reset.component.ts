import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-password-reset',
  templateUrl: './user-password-reset.component.html',
  styleUrls: ['./user-password-reset.component.css']
})
export class UserPasswordResetComponent implements OnInit {

  constructor(private router: Router,
    private userService: UserService,
    private authService: AuthService) { }

  userCache: User = {
    userID: 0,
    userName: '',
    userPassword: '',
    userIsManager: false,
    userIsRemoved: false
  }

  ngOnInit(): void
  {
    this.userCache = this.authService.getCurrentUser();
  }
  
  submitNewPassword()
  {
    if (this.userCache.userPassword != "t_password")
    {
      if (this.userCache.userPassword.length >= 8)
      {
        this.userService.updateUserService(this.userCache).subscribe(
          (response) =>
          {
            alert("Password updated. Please login again.");
            this.router.navigate(['logout']);
          },
          (error) =>
          {
            console.log(error);
          }
        );
      }
      else
      {
        alert("Password must be at least 8 characters in length.");
      }
    }
    else
    {
      alert("Password cannot be old or temporary.");
    }
  }

  cancelForm()
  {
    this.router.navigate(['logout']);
  }
}
