import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {


  baseUrl = environment.hostUrl +"/admin/dashboard"

  constructor(private httpClient:HttpClient) { }
  
  getDetails(){
    return this.httpClient.get(`${this.baseUrl}/details`);
  }



  getAllTaskDetailsByStatus(){
    return this.httpClient.get(`${this.baseUrl}/total-tasks`);
  }
}
