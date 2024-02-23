import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdminAttendanceSearch } from 'src/app/entites/admin-attendance-search';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminAttendanceService {

  baseUrl = environment.hostUrl + '/admin/attendance';

  constructor(private httpClient:HttpClient) { }

  getAttendance(pageNo:number,pageSize:number){
    return this.httpClient.get(`${this.baseUrl}/${pageNo}/${pageSize}`);
  }

  searchAttendance(pageNo:number,pageSize:number,searchRequest:AdminAttendanceSearch){
    return this.httpClient.post(`${this.baseUrl}/search/${pageNo}/${pageSize}`,searchRequest);
  }
}
