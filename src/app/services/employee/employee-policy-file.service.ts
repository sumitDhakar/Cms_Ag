import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeePolicyFileService {

  baseUrl = environment.hostUrl +"/employee/policyFile"

  constructor(private httpClient:HttpClient) { }

 // download file from server 
 downloadFile(id:number):Observable<HttpEvent<Blob>>{
  return this.httpClient.get(`${this.baseUrl}/${id}`,{
   reportProgress:true,
   observe:'events',
   responseType:'blob'
 
  })
   }
  
deletePolicyFile(id:number){
  return this.httpClient.delete(`${this.baseUrl}/${id}`);
}

}
