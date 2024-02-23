import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Roles } from 'src/app/entites/roles';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminRoleService {

  baseUrl = environment.hostUrl + "/admin/roles";

  constructor(private httpClient: HttpClient) { }

  addRole(role: Roles) {
    return this.httpClient.post(`${this.baseUrl}/`, role);
  }

  updateRole(role: Roles) {
    return this.httpClient.put(`${this.baseUrl}/`, role);
  }

  getAllRoles(){
    return this.httpClient.get(`${this.baseUrl}/`);
  }

  getRolesById(id:any){
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }

  deleteRoleById(id:any){
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }
}
