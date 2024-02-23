import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Users } from '../entites/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  getAllUsers() {
    throw new Error('Method not implemented.');
  }

baseUrl=environment.hostUrl+'/employee/allEmployee';
  constructor(private httpClient:HttpClient) { }

  // adding employees
  addEmployee(user:Users){
   return this.httpClient.post(`${this.baseUrl}/`,user);
  }

  // update Employee
  updateEmployee(user:Users){
    return this.httpClient.post(`${this.baseUrl}/`,user);
  }

  // get Employee By Id
  getEmployeeById(id:number){
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }

  // get All Employee
  getAllEmployees(pageNo:number,pageSize:number){
    return this.httpClient.get(`${this.baseUrl}/${pageNo}/${pageSize}`);
  }

  // search employee
  searchEmployee(pageNo:number,pageSize:number,user:Users){
    return this.httpClient.post(`${this.baseUrl}/search/${pageNo}/${pageSize}`,user);
  }

}
