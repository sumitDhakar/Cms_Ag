import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Permissions } from 'src/app/entites/permissions';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminPermissionService {

  baseUrl = environment.hostUrl +'/admin/permission';
  constructor(private httpClient:HttpClient) { }

  getPermissionsOfRoleByRoleId(id:any){
    return this.httpClient.get(`${this.baseUrl}/role/${id}`);
  }

  getPermissionByTitle(title:string){
    return this.httpClient.get(`${this.baseUrl}/${title}`);
  }

  updateAllPermissions(permissions:Permissions[]){
       return this.httpClient.put(`${this.baseUrl}/`,permissions);
  }
}
