import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDesignationService {

  baseUrl=environment.hostUrl+'/employee/designation';
  // baseUrl ="localhost:8080/employee/department/";
  constructor(private httpClient:HttpClient) { }
   
    // get All 
    getAllDesignation(pageNo:number,pageSize:number){
      return this.httpClient.get(`${this.baseUrl}/`);
    // return this.httpClient.get(`${this.baseUrl}`);
    }
}
