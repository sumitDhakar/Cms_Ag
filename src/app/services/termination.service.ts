import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Termination } from '../entites/termination';

@Injectable({
  providedIn: 'root'
})
export class TerminationService {


  baseUrl=environment.hostUrl+'/admin/termination';

  constructor(private httpClient:HttpClient) { }

  
// add termination
  addTermination(termination:Termination){
    return this.httpClient.post(`${this.baseUrl}/`,termination);
 }
// update termination
updateTermination(termination:Termination){
  return this.httpClient.put(`${this.baseUrl}/`,termination);

}
//delete termination   
deleteTermination(deleteId: number) {
  return this.httpClient.delete(`${this.baseUrl}/${deleteId}`);
}
// get termination By Id
getTerminationById(terminationId:number){
  return this.httpClient.get(`${this.baseUrl}/${terminationId}`);
}


  // get All termination
  getAllTermination(pageNo:number,pageSize:number){
    return this.httpClient.get(`${this.baseUrl}/${pageNo}/${pageSize}`);
 }



  // search termination
  searchTerminationn(pageNo:number,pageSize:number,termination:Termination){
    return this.httpClient.post(`${this.baseUrl}/search/${pageNo}/${pageSize}`,termination);
  }

}
