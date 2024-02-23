import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModulePermissionsService {
  baseUrl = environment.hostUrl + '/admin/module';

constructor(private httpClient:HttpClient){}

  getModulePermissions(id:any){
    return this.httpClient.get(`${this.baseUrl}/permission/${id}`);
  }

}
