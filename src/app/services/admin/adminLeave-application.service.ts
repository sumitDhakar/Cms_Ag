import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LeaveApplications } from '../../entites/leave-applications';

@Injectable({
  providedIn: 'root'
})
export class LeaveApplicationService {

  baseUrl=environment.hostUrl + '/admin/leave';

  constructor(private httpClient:HttpClient) { }

  //  update Leave Status
  updateLeaveStatus(status:string,id:number){
      return this.httpClient.put(`${this.baseUrl}/status/${id}`,status);
  }


  // get All Leaves
  getAllLeaves(pageNo:number,pageSize:number){
     return this.httpClient.get(`${this.baseUrl}/${pageNo}/${pageSize}`);
  }

  // get Leave By Id
  getLeaveById(id:number){
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }

  // get Leave By Applicant Id
  getLeavesByApplicantId(pageNo:number,pageSize:number,id:number){
    return this.httpClient.get(`${this.baseUrl}/applicant/${pageNo}/${pageSize}/${id}`);
  }

  // get Leave By Type
  getLeavesByTypeId(pageNo:number,pageSize:number,id:number){
    return this.httpClient.get(`${this.baseUrl}/type/${pageNo}/${pageSize}/${id}`);
  }
  // get Leave by status
  getLeavesByStatus(pageNo:number,pageSize:number,status:String){
    return this.httpClient.get(`${this.baseUrl}/status/${pageNo}/${pageSize}/${status}`);
  }

  // get leave statics
  getLeaveApplicatonStatics(){
    return this.httpClient.get(`${this.baseUrl}/statics`);
  }

  // delete Leave by Id
  deleteLeaveApplicationById(id:number){
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }

  // search employee
  searchEmployee(pageNo:number,pageSize:number,leaveApplication:LeaveApplications){
    return this.httpClient.post(`${this.baseUrl}/search/${pageNo}/${pageSize}`,leaveApplication);
  }
}

