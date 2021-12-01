import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/user/auth.service';
import { Request } from '../request.model';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-request-management',
  templateUrl: './request-management.component.html',
  styleUrls: ['./request-management.component.css']
})
export class RequestManagementComponent implements OnInit
{

  allRequests: Request[] = [];

  constructor(private requestService: RequestService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void
  {
    this.requestService.getAllRequestsService().subscribe(
      (response) =>
      {
        this.allRequests = response;
      },
      (error) =>
      {
        console.log(error);
      }
    );
  }

  goToRequestEdit(requestID: any)
  {
    this.router.navigate(['request-details', requestID]);
  }
}
