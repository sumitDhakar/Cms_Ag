import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StaffSalary } from '../entites/staff-salary';

@Injectable({
  providedIn: 'root'
})
export class StaffSalaryService {
  baseUrl=environment.hostUrl+'/admin/staffSalary';

  constructor(private httpClient:HttpClient) { }
  // add StaffSalary
  addStaffSalary(trainers:StaffSalary){
    
    return this.httpClient.post(`${this.baseUrl}/`,trainers);
  }
  // get All StaffSalary
  getAllStaffSalary(pageNo:number,pageSize:number){
    return this.httpClient.get(`${this.baseUrl}/${pageNo}/${pageSize}`);
  }
  
  // update StaffSalary
  updateStaffSalary(trainers:StaffSalary){
    return this.httpClient.put(`${this.baseUrl}/`,trainers);
  
    
  
  }
  
  //delete StaffSalary
  deleteStaffSalary(deleteId: number) {
    return this.httpClient.delete(`${this.baseUrl}/${deleteId}`);
  }
  // get StaffSalary By Id
  getStaffSalaryByID(id:number){
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }
  
  // search StaffSalary
  searchStaffSalary(pageNo:number,pageSize:number,staffSalary:StaffSalary){
    return this.httpClient.post(`${this.baseUrl}/search/${pageNo}/${pageSize}`,staffSalary);
  }
}
