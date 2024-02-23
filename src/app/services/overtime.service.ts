import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OverTime } from '../entites/over-time';
import { OverTimeRequest } from '../payload/over-time-request';

@Injectable({
  providedIn: 'root'
})
export class OvertimeService {
  baseUrl = environment.hostUrl + '/employee/overtime';

  constructor(private httpClient: HttpClient) { }


// get Over Time by status
getOverTimeByStatus(status:String,id:number){
  return this.httpClient.get(`${this.baseUrl}/status/${status}/${id}`);
}
  addOverTime( overTime: OverTimeRequest) {
    return this.httpClient.post(`${this.baseUrl}/`, overTime);
  }


  updateOverTime( overTime: OverTimeRequest) {
    return this.httpClient.put(`${this.baseUrl}/`, overTime);
  }

  // get All overtime
  getAllOverTime(pageNo: number, pageSize: number) {
    return this.httpClient.get(`${this.baseUrl}/${pageNo}/${pageSize}`);
  }

  // get All overtime
  getAllOverTimeOfCurrentUser(pageNo: number, pageSize: number) {
    return this.httpClient.get(`${this.baseUrl}/current/${pageNo}/${pageSize}`);
  }


  getTotalWorkingHours() {
    return this.httpClient.get(`${this.baseUrl}/total-worked-hours`);
  }

  // get overtime By Id
  getOverTimeById(id: number) {
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }

  // get Leave By Type
  // getLeavesByTypeId(pageNo:number,pageSize:number,id:number){
  //   return this.httpClient.get(`${this.baseUrl}/type/${pageNo}/${pageSize}/${id}`);
  // }
  // get Leave by status
  // getLeavesByStatus(pageNo:number,pageSize:number,status:String){
  //   return this.httpClient.get(`${this.baseUrl}/status/${pageNo}/${pageSize}/${status}`);
  // }

  // delete Leave by Id
  deleteOverTimeById(id: number) {
    return this.httpClient.delete(`${this.baseUrl}/delete/${id}`);
  }

  // search overTime
  searchOverTime(pageNo: number, pageSize: number, overTime: OverTime) {
    return this.httpClient.post(`${this.baseUrl}/search/${pageNo}/${pageSize}`, overTime);
  }
}

