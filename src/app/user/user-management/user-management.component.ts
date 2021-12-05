import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit
{

  userRoster: User[] = [];

  profilePics: string[] = [
    "../../../assets/mike-stoklasa}-232863-normal.jpg",
    "../../../assets/jay-bauman}-232864-normal.jpg",
    "../../../assets/rich_evans_suit.jpg"
  ];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void
  {
    this.userService.getAllUsersService().subscribe(
      (response) =>
      {
        this.userRoster = response;
      },
      (error) =>
      {
        console.log(error);
      }
    );
  }
  goToUserDetails(userID: any)
  {
    this.router.navigate(['user-details', userID]);
  }

  goToAddUser()
  {
    this.router.navigate(['user-add']);
  }

  getImagePath(userID: number): string
  {
    return this.profilePics[userID - 1];
  }
}
