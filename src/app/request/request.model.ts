export class Request
{
    requestID: number = -1;
    userRef: number = 0;
    amount: number = 0;
    dateCreated: string = '';
    status: RequestStatus = RequestStatus.Pending;
}
export enum RequestStatus
{
    Pending = "PENDING",
    Approved = "APPROVED",
    Denied = "DENIED"
}