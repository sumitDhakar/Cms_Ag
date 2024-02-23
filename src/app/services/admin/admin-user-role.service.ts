import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRoles } from 'src/app/entites/user-roles';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminUserRoleService {

  baseUrl = environment.hostUrl +"/admin/userRole"

  constructor(private httpClient:HttpClient) { }

  addUserRole(userRole:UserRoles){
    return  this.httpClient.post(`${this.baseUrl}/`,userRole);
  }

  
  updateUserRole(userRole:UserRoles){
    return  this.httpClient.put(`${this.baseUrl}/`,userRole);
  }

  
  getUserRoleById(id:any){
    return   this.httpClient.get(`${this.baseUrl}/${id}`);
  }
  
  getAllUserRoles(){
    return  this.httpClient.get(`${this.baseUrl}/`);
  }

  getUserRolesOfUser(id:any){
    return this.httpClient.get(`${this.baseUrl}/user/${id}`);
  }

  deleteUserRoleBYyId(id:any){
    return  this.httpClient.delete(`${this.baseUrl}/${id}`);
  }
}
