import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Holidays } from '../../entites/holidays';
import { Department } from '../../entites/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  baseUrl=environment.hostUrl+'/admin/department/';
  // baseUrl ="localhost:8080/employee/department/";
  constructor(private httpClient:HttpClient) { }
  
  // adding 
  addDepartment(department:Department){
    return this.httpClient.post(`${this.baseUrl}`,department);
    }
    
    // update 
    updateDepartment(department:Department){
      return this.httpClient.put(`${this.baseUrl}`,department);
    
    }
    //delete Department   
    deleteDepartment(deleteId: number) {
      return this.httpClient.delete(`${this.baseUrl}delete/${deleteId}`);
    }
    // get  By Id
    getDepartmentById(id:number){
      return this.httpClient.get(`${this.baseUrl}update/${id}`);
    }
  
    // get All 
    getAllDepartment(){
      return this.httpClient.get(`${this.baseUrl}`);
    // return this.httpClient.get(`${this.baseUrl}`);
    }
  
    // search employee
    searchDepartment(pageNo:number,pageSize:number,department:Department){
      return this.httpClient.post(`${this.baseUrl}search/${pageNo}/${pageSize}`,department);
    }
  
  }
  