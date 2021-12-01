import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user.model';

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

  displayUser: boolean = false;
  displayRequests: boolean = false;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void
  {
  }

  viewUserRequests() { this.displayRequests = !this.displayRequests; }

  resetUserPassword()
  {

  }

  removeUser()
  {

  }
}
