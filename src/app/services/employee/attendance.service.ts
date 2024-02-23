import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Attendance } from 'src/app/entites/attendance';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  baseUrl = environment.hostUrl + '/employee/attendance'

  constructor(private httpClient:HttpClient) { }

  // add attendance
  addAttendance(attendance:Attendance){
    return this.httpClient.post(`${this.baseUrl}/`,attendance);
  }

  // update attendance
  updateAttendance(attendance:Attendance){
    return this.httpClient.put(`${this.baseUrl}/`,attendance);
  }

  // get attendance by user id
  getAttendanceByUserId(pageNo:number,pageSize:number,id:number){
    return this.httpClient.get(`${this.baseUrl}/user/${pageNo}/${pageSize}/${id}`)
  }

  // get all attendance 
  getAllAttendance(pageNo:number,pageSize:number,id:number){
    return this.httpClient.get(`${this.baseUrl}/${pageNo}/${pageSize}`)
  }

  // get latest attendance entry of user by id
   getLatestAttendanceByUserId(id:number){
    return this.httpClient.get(`${this.baseUrl}/latest/${id}`);
   }

   // first in time from attendance of User According to date
   getFirstInTimeByUserId(date:string,id:number){
      return this.httpClient.get(`${this.baseUrl}/firstIn/${date}/${id}`)
   }

   // last in time from attendance of user According to date
   getLastOutTimeByUserId(date:string,id:number){
    return this.httpClient.get(`${this.baseUrl}/lastOut/${date}/${id}`)
   }
    
  // get all attendance of user by given date
  getAllAttendanceOfDateByUserId(date:string,id:number){
    return this.httpClient.get(`${this.baseUrl}/date/${date}/${id}`);
  }

  // get attendance history of user  (Chat GPT Kiya tha 'aise m to loop zyada lg rhe the')
  getAttendanceHistoryOfUserByUserId(pageNo:number,pageSize:number,id:number){
   return this.httpClient.get(`${this.baseUrl}/history/${pageNo}/${pageSize}/${id}`)
  }
  
  // searching
  searchAttendance(pageNo:number,pageSize:number,date:string,id:number){
 return this.httpClient.post(`${this.baseUrl}/search/${pageNo}/${pageSize}/${id}`,date);
  }

  getAttendanceStaticsOfUser(){
    return this.httpClient.get(`${this.baseUrl}/statics`);
  }

}
