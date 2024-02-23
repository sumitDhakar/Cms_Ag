import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDashboardServiceService {

  baseUrl = environment.hostUrl +"/employee/dashboard"

  constructor(private httpClient:HttpClient) { }
  
  getEmployeeDetails(){
    return this.httpClient.get(`${this.baseUrl}/details`);
  }

  
  fetchDetailsHoildayes(){
    return this.httpClient.get(`${this.baseUrl}/`);
  }
}
