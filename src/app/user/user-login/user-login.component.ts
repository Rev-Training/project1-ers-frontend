import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit
{

  newUser: User = {
    userID: 0,
    userName: '',
    userPassword: '',
    userIsManager: false,
    userIsRemoved: false
  }

  validatedUser: User = {
    userID: 0,
    userName: '',
    userPassword: '',
    userIsManager: false,
    userIsRemoved: false
  }

  buttonDisplay: boolean = true;

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void
  {
    this.buttonDisplay = !this.userLoggedIn();
  }

  userLoggedIn(): boolean
  {
    return this.authService.isLoggedIn;
  }

  // validateLogin() //hack <.<
  // {
  //  if (this.newUser.userName == "admin" && this.newUser.userPassword == "admin")
  //  {
  //    this.newUser.userID = 1;
  //    this.newUser.userIsManager = true;
  //  }
  //  else
  //  {
  //    this.newUser.userID = 2;
  //    this.newUser.userIsManager = false;
  //  }
  //  this.validatedUser = this.newUser;
  //  this.authService.cacheUser(this.validatedUser);
  //  this.authService.isLoggedIn = true;
  //  this.router.navigate(['home']);
  // }
  validateLogin()
  {
    this.userService.getUserIDService(this.newUser.userName).subscribe(
      (response) =>
      {
        this.newUser.userID = response;
        console.log(response);

        this.userService.getUserService(this.newUser).subscribe(
          (response) =>
          {
            console.log(response);
            this.validatedUser = response;
            console.log(this.validatedUser);

            if (this.validatedUser.userID > 0 && this.validatedUser.userPassword == this.newUser.userPassword)
            {
              this.authService.cacheUser(this.validatedUser);
              this.authService.isLoggedIn = true;
              if (this.validatedUser.userPassword == "t_password")
              {
                this.router.navigate(['pw-reset']);
              }
              else
              {
                this.router.navigate(['home']);
              } 
            }
            else
            {
              alert('invalid credentials');                
              this.router.navigate(['login']);
            }

          },
          (error) =>
          {
            console.log(error);
          }
        );
      },
      (error) =>
      {
        console.log(error);
        console.log("user not found");
      });
  }
  forgotPassword()
  {
    alert("That feature will be implemented in a future patch.");
  }

  validateOld()
  {
    
  }
}
