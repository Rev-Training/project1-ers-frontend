import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit
{

  constructor(private authService: AuthService, private router: Router) { }


  ngOnInit(): void
  {

  }

  isLoggedIn()
  {
    return this.authService.isLoggedIn;
  }

  managerLevel()
  {
    return this.authService.userIsManager();
  }
}
