import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Request } from './request.model';

@Injectable({
  providedIn: 'root'
})
export class RequestService
{

  baseURL = "http://localhost:9876/api/requests";

  constructor(private http: HttpClient) { }

  addRequestService(request: Request): Observable<Request>
  {
    return this.http.post<Request>(this.baseURL, request);
  }

  getRequestService(requestID: number): Observable<Request>
  {
    return this.http.get<Request>(this.baseURL + "/id/" + requestID);
  }

  getAllRequestsService(): Observable<Request[]>
  {
    return this.http.get<Request[]>(this.baseURL);
  }

  getAllUserRequestsService(userID: number): Observable<Request[]>
  {
    return this.http.get<Request[]>(this.baseURL + "/user/" + userID);
  }

  updateRequestService(request: Request, approve: boolean): Observable<Request>
  {
    let approval: string = approve ? "/a/" : "/d/";
    return this.http.put<Request>(this.baseURL + approval + request.requestID, request);
  }
}
