import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/request/request.service';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { Request, RequestStatus } from '../../request/request.model'
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit
{
  currentUser: User = {
    userID: 0,
    userName: '',
    userPassword: '',
    userIsManager: false,
    userIsRemoved: false
  }

  userRequests: Request[] = [];
  pendingStatus: RequestStatus = RequestStatus.Pending;
  displayUser: boolean = false;
  displayRequests: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private requestService: RequestService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void
  {
    this.displayUser = false;
    let recievedUserID: any = this.activatedRoute.snapshot.paramMap.get("sentUserID");
    this.userService.getUserByIDService(recievedUserID).subscribe(
      (response) =>
      {
        this.currentUser = response;
        this.requestService.getAllUserRequestsService(recievedUserID).subscribe(
          (response) =>
          {
            this.userRequests = response;
          },
          (error) =>
          {
            console.log(error);
          }
        )
      },
      (error) =>
      {
        console.log(error);
      });
    this.displayUser = true;
  }

  viewUserRequests() { this.displayRequests = !this.displayRequests; }

  managerAccess(): boolean
  {
    return this.authService.userIsManager();
  }

  goToRequestEdit(requestID: any)
  {
    this.router.navigate(['request-details', requestID]);
  }

  resetUserPassword()
  {
    if (this.currentUser.userPassword != "t_password")
    {
      this.currentUser.userPassword = "t_password"
      this.userService.updateUserService(this.currentUser).subscribe(
        (response) =>
        {
          if (this.managerAccess())
          {
            alert("Password has been reset for user #" + response.userID);
          }
          else
          {
            alert("Your password has been reset. Please login again with your temporary password to update it.");
            this.router.navigate(['logout']);
          }
        },
        (error) =>
        {
          console.log(error);
        }
      );
    }
    else
    {
      alert("Password already reset.")
    }
  }

  removeUser()
  {
    if (!this.currentUser.userIsRemoved)
    {
      this.currentUser.userIsRemoved = true;
      this.userService.updateUserService(this.currentUser).subscribe(
        (response) =>
        {
          alert("User #" + response.userID + " has been marked for removal.");
        },
        (error) =>
        {
          console.log(error);
        }
      );
    }
    else
    {
      alert("User #" + this.currentUser + " has already been marked for removal.");
    }
  }

  getUserID(): number
  {
    return this.authService.getCurrentUser().userID;
  }
  
  getImagePath(userID: number): string
  {
    return "../" + this.userService.profilePics[userID - 1];
  }
}
