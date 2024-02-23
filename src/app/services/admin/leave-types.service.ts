import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LeaveType } from '../../entites/leave-type';

@Injectable({
  providedIn: 'root'
})
export class LeaveTypesService {

  baseUrl=environment.hostUrl + "/admin/leaveTypes"

  constructor(private httpClient:HttpClient) { }

  // add leave type
  addLeaveType(leaveType:LeaveType){
    return this.httpClient.post(`${this.baseUrl}/`,leaveType);
  }

  // update leave type
  updateLeaveType(leaveType:LeaveType){
    return this.httpClient.put(`${this.baseUrl}/`,leaveType);
  }

  // delett leaveType by id
  deleteLeaveTypeById(id:number){
     return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }

   // get leaveType by status
   updateLeaveTypeStatus(status:String,id:number){
  return this.httpClient.get(`${this.baseUrl}/status/${status}/${id}`);
}

}
