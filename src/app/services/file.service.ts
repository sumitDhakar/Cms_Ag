import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  baseUrl=environment.hostUrl +"/projectFiles";

  constructor(private httpClient:HttpClient) { }

  downloadFile(id:number):Observable<HttpEvent<Blob>>{
 return this.httpClient.get(`${this.baseUrl}/download/${id}`,{
  reportProgress:true,
  observe:'events',
  responseType:'blob'
 })
  }
}
