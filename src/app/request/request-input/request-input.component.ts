import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/user/auth.service';
import { Request, RequestStatus } from '../request.model';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-request-input',
  templateUrl: './request-input.component.html',
  styleUrls: ['./request-input.component.css']
})
export class RequestInputComponent implements OnInit
{

  newRequest: Request = {
    requestID: 0,
    userRef: 0,
    amount: 0,
    dateCreated: '',
    status: RequestStatus.Pending
  }

  constructor(private requestService: RequestService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void
  {

  }

  submitNewRequest()
  {
    if (this.newRequest.amount >= 1.00)
    {
      this.newRequest.userRef = this.authService.getCurrentUser().userID;

      this.requestService.addRequestService(this.newRequest).subscribe(
        (response) =>
        {
          if (response.amount == this.newRequest.amount)
          {
            alert("Your request for $" + response.amount + " was added successfully.");
          }
          else
          {
            alert("INTERNAL ERROR: Please try again later.");
          }
          this.cancelForm();
        },
        (error) =>
        {
          console.log(error);
        }
      );
    }
    else
    {
      alert("Amount must be greater than $1.00");
    }
  }

  cancelForm()
  {
    this.router.navigate(['home']);
  }

}
