import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { Request, RequestStatus } from '../request.model';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css']
})
export class RequestDetailsComponent implements OnInit
{

  currentRequest: Request = {
    requestID: -1,
    userRef: 0,
    amount: 0,
    dateCreated: '',
    status: RequestStatus.Pending,
  }

  requestUserName: string = '';
  displayRequest: boolean = false;
  confirmRequestEditButtons: boolean = false;
  pendingApproval: boolean = false;

  constructor(private requestService: RequestService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void
  {
    this.confirmRequestEditButtons = false;
    this.displayRequest = false;

    let recievedRequestID: any = this.activatedRoute.snapshot.paramMap.get("sentRequestID");
    console.log(this.activatedRoute.snapshot.paramMap.get("sentRequestID"));
    this.requestService.getRequestService(recievedRequestID).subscribe(
      (response) =>
      {
        this.currentRequest = response;
        this.userService.getUserByIDService(this.currentRequest.userRef).subscribe(
          (response) =>
          {
            this.requestUserName = response.userName;
          },
          (error) =>
          {
            console.log(error);
          })
        this.displayRequest = true;
      },
      (error) =>
      {
        console.log(error);
      }
    );
  }

  confirmRequestEdit(approval: boolean)
  {
    this.confirmRequestEditButtons = true;
    this.pendingApproval = approval;
  }

  cancelRequestEdit()
  {
    this.confirmRequestEditButtons = false;
  }

  goToAllRequests()
  {
    this.router.navigate(['request-management']);
  }

  updateRequest()
  {   
    this.requestService.updateRequestService(this.currentRequest, this.pendingApproval).subscribe(
      (response) =>
      {
        let userAlert: string = "Request #" + response.requestID + " has been " + (this.pendingApproval ? "approved." : "denied.");
        alert(userAlert);
        this.displayRequest = false;
        this.router.navigate(['request-management']);
      },
      (error) =>
      {
        console.log(error);
      }
    );
  }
}
