import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Designation } from '../../entites/designation';

@Injectable({
  providedIn: 'root'
})
export class DesignationService{
  baseUrl=environment.hostUrl+'/admin/designation';
  // baseUrl ="localhost:8080/employee/department/";
  constructor(private httpClient:HttpClient) { }
  
  // adding 
  addDesignation(designation:Designation){
    return this.httpClient.post(`${this.baseUrl}/`,designation);
    }
    
    // update 
    updateDesignation(designation:Designation){
      return this.httpClient.put(`${this.baseUrl}/`,designation);
    
    }
    //delete Department   
    deleteDesignation(deleteId: number) {
      return this.httpClient.delete(`${this.baseUrl}/delete/${deleteId}`);
    }
    // get  By Id
    getDesignationById(id:number){
      return this.httpClient.get(`${this.baseUrl}/update/${id}`);
    }
 

    getAllDesignationByDepartmentId(id:number){
      return this.httpClient.get(`${this.baseUrl}/all/${id}`);
    // return this.httpClient.get(`${this.baseUrl}`);
    }
  

    // search employee
    searchDesignation(pageNo:number,pageSize:number,designation:Designation){
      return this.httpClient.post(`${this.baseUrl}/search/${pageNo}/${pageSize}`,designation);
    }
  
  }
  