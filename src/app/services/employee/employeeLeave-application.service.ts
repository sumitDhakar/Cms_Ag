import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LeaveApplications } from '../../entites/leave-applications';

@Injectable({
  providedIn: 'root'
})
export class EmployeeLeaveApplicationService {

  baseUrl=environment.hostUrl + '/employee/leave';

  constructor(private httpClient:HttpClient) { }

  // add leave 
  createLeave(leaveApplication:LeaveApplications){
     return this.httpClient.post(`${this.baseUrl}/`,leaveApplication);
  }

  // update leave
  updateLeave(leaveApplication:LeaveApplications){
    return this.httpClient.put(`${this.baseUrl}/`,leaveApplication);
  }

  // get Leave By Id
  getLeaveById(id:number){
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }

  // get Leave By Applicant Id
  getLeavesByApplicantId(pageNo:number,pageSize:number){
    return this.httpClient.get(`${this.baseUrl}/applicant/${pageNo}/${pageSize}`);
  }

  // get Leave By Type
  getLeavesByTypeId(pageNo:number,pageSize:number,id:number){
    return this.httpClient.get(`${this.baseUrl}/type/${pageNo}/${pageSize}/${id}`);
  }

  // delete Leave by Id
  deleteLeaveApplicationById(id:number){
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }

// get employee leave statics
getLeaveStatics(){
   return this.httpClient.get(`${this.baseUrl}/statics`);
}

}

