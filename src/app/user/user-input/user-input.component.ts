import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css']
})
export class UserInputComponent implements OnInit
{

  static emailSuffix: string = "";

  newUser: User = {
    userID: 0,
    userName: '',
    userPassword: '',
    userIsManager: false,
    userIsRemoved: false
  }

  constructor(private router: Router,
              private userService: UserService) { }

  ngOnInit(): void
  {
  }

  submitNewUser()
  {
    if (this.newUser.userName.includes("@", 3) && this.newUser.userName.includes(".", 7))
    {
      this.newUser.userPassword = "t_password";
      this.userService.addUserService(this.newUser).subscribe(
        (response) =>
        {
          alert("User #" + response.userID + " has been added.");
          this.cancelForm();
        },
        (error) =>
        {
          console.log(error);
        }
      )
    }
    else
    {
      alert("Invalid Email Address");
      this.newUser.userName = "";
    }
  }

  processFile(imageInput: any)
  {
    
  }

  cancelForm()
  {
    this.router.navigate(['user-management']);
  }
}
