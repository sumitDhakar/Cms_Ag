import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TerminationType } from '../entites/termination-type';

@Injectable({
  providedIn: 'root'
})
export class TerminationTypeService{
  
  baseUrl=environment.hostUrl+'/admin/terminationType';

constructor(private httpClient:HttpClient) { }


// add terminationType
addTerminationType(terminationType:TerminationType){
  return this.httpClient.post(`${this.baseUrl}/`,terminationType);
}

// get All terminationType
getAllTerminationtype(pageno:number,pageSize:number){
  return this.httpClient.get(`${this.baseUrl}/${pageno}/${pageSize}`);
}


}