import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LeaveType } from '../../entites/leave-type';

@Injectable({
  providedIn: 'root'
})
export class EmployeeLeaveTypesService {

  baseUrl=environment.hostUrl + "/employee/leaveTypes"

  constructor(private httpClient:HttpClient) { }

  // get all leaveTypes
  getAllLeaveTypes(){
    return this.httpClient.get(`${this.baseUrl}/`);
  }

  // get Leave Type by Id
  getLeaveTypesById(id:number){
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }

getAllLeaveTypeActive(){
  return this.httpClient.get(`${this.baseUrl}/active`)
}

}
