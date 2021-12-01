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
  goToUserEdit(userID: any)
  {
    this.router.navigate(['user-details', userID]);
  }
}
